import React, { useState, createContext, useContext, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  initialCheckoutSession,
  verifyPayment,
} from "../../store/payment/payment-action";
import { selectPaymentStatus } from "../../store/payment/payment-slice";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingCart,
  CreditCard,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
} from "lucide-react";

// Cart Context for sharing cart state across components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (dish) => {
    setCart((prev) => ({
      ...prev,
      [dish._id]: {
        ...dish,
        quantity: (prev[dish._id]?.quantity || 0) + 1,
      },
    }));
  };

  const removeFromCart = (dishId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[dishId] && newCart[dishId].quantity > 1) {
        newCart[dishId].quantity -= 1;
      } else {
        delete newCart[dishId];
      }
      return newCart;
    });
  };

  const clearFromCart = (dishId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[dishId];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
    setShowCheckout(false);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const value = {
    cart,
    showCheckout,
    setShowCheckout,
    addToCart,
    removeFromCart,
    clearFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const Checkout = () => {
  const { isDarkMode } = useTheme();
  const {
    cart,
    showCheckout,
    setShowCheckout,
    removeFromCart,
    addToCart,
    clearFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, error, orderData } = useSelector(selectPaymentStatus);

  const [currentStep, setCurrentStep] = useState(1); // 1: Cart, 2: Details, 3: Payment
  const [orderDetails, setOrderDetails] = useState({
    name: user?.name || "",
    phone: user?.phoneNumber || "",
    email: user?.email || "",
    address: "",
  });

  const loadRazorPayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const isLoaded = await loadRazorPayScript();
      if (!isLoaded) {
        toast.error("Failed to load Razorpay SDK");
        return;
      }

      const restaurantId = Object.values(cart)[0]?.restaurantId; // Assuming items from one restaurant
      if (!restaurantId) {
        toast.error("No restaurant selected. Please add items to the cart.");
        return;
      }

      const items = Object.values(cart).map((item) => ({
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      dispatch(
        initialCheckoutSession({
          amount: getTotalPrice() + Math.round(getTotalPrice() * 0.18), // Include 18% GST
          currency: "INR",
          restaurantId,
          items,
          deliveryAddress: orderDetails.address,
        })
      );
    } catch (error) {
      console.error("Error in checkout payment:", error.message);
      toast.error("Failed to initiate payment");
    }
  };

  useEffect(() => {
    if (!orderData || !orderData.keyId) {
      return;
    }

    const restaurantId = Object.values(cart)[0]?.restaurantId;
    if (!restaurantId) {
      toast.error("No restaurant selected.");
      return;
    }

    const items = Object.values(cart).map((item) => ({
      menuItemId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "QuickBite",
      description: `Order from ${orderData.restaurantName}`,
      order_id: orderData.orderId,
      handler: async (response) => {
        try {
          await dispatch(
            verifyPayment({
              razorpayData: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              orderDetails: {
                restaurantId,
                items,
                totalAmount:
                  getTotalPrice() + Math.round(getTotalPrice() * 0.18),
                deliveryAddress: orderDetails.address,
              },
            })
          );
          toast.success("Order confirmed! Redirecting to order history...");
          clearCart();
          setCurrentStep(1);
          navigate("/myorders");
        } catch (error) {
          toast.error("Payment verification failed");
          navigate("/foodhome");
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.phoneNumber || "",
      },
      notes: {
        restaurant_id: restaurantId,
        restaurant_name: orderData.restaurantName,
      },
      theme: {
        color: "#FF5A5F",
      },
      modal: {
        ondismiss: () => {
          toast.error("Payment cancelled");
        },
      },
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      toast.error("Failed to open payment window");
    }
  }, [orderData, dispatch, navigate, cart, orderDetails, user, getTotalPrice]);

  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const isDetailsValid = () => {
    return orderDetails.name && orderDetails.phone && orderDetails.address;
  };

  const themeClasses = isDarkMode
    ? "bg-gray-900/95 text-white border-gray-700/50"
    : "bg-white/95 text-gray-900 border-gray-200/50";

  const buttonClasses = isDarkMode
    ? "bg-gray-800/80 hover:bg-gray-700/80 border-gray-600/50"
    : "bg-white/80 hover:bg-gray-50/80 border-gray-300/50";

  const inputClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
    : "bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500";

  if (!showCheckout) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowCheckout(false)}
      ></div>

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md ${themeClasses} shadow-2xl transform transition-transform duration-300 translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
            <div>
              <h2 className="text-l font-bold">
                {currentStep === 1 && "Your Cart"}
                {currentStep === 2 && "Delivery Details"}
                {currentStep === 3 && "Payment"}
              </h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {currentStep === 1 &&
                  `${getTotalItems()} ${
                    getTotalItems() === 1 ? "item" : "items"
                  }`}
                {currentStep === 2 && "Enter your delivery information"}
                {currentStep === 3 && "Complete your order"}
              </p>
            </div>
            <button
              onClick={() => setShowCheckout(false)}
              className={`p-2 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="p-6 border-b border-gray-200/20">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs">
              <span
                className={
                  currentStep >= 1
                    ? "text-orange-500"
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              >
                Cart
              </span>
              <span
                className={
                  currentStep >= 2
                    ? "text-orange-500"
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              >
                Details
              </span>
              <span
                className={
                  currentStep >= 3
                    ? "text-orange-500"
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              >
                Payment
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Step 1: Cart Items */}
            {currentStep === 1 && (
              <>
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart
                      className={`w-16 h-16 mx-auto mb-4 ${
                        isDarkMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    />
                    <h3 className="text-lg font-medium mb-2">
                      Your cart is empty
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Add some delicious items to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.values(cart).map((item) => (
                      <div
                        key={item._id}
                        className={`p-4 rounded-2xl border ${buttonClasses} backdrop-blur-sm transition-all duration-300`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) =>
                                (e.target.src = "/assets/nofood.png")
                              }
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">
                              {item.name}
                            </h4>
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              ₹{item.price} each
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-green-500">
                                ₹{item.price * item.quantity}
                              </span>

                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => removeFromCart(item._id)}
                                  className={`p-1 rounded-lg border ${buttonClasses} hover:scale-105 transition-all duration-300`}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className={`p-1 rounded-lg border ${buttonClasses} hover:scale-105 transition-all duration-300`}
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => clearFromCart(item._id)}
                                  className="p-1 rounded-lg border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 ml-2"
                                >
                                  <Trash2 className="w-3 h-3 text-red-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Delivery Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderDetails.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-xl border ${inputClasses} focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderDetails.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-xl border ${inputClasses} focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <Mail className="w-4 h-4" />
                    <span>Email (Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={orderDetails.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-xl border ${inputClasses} focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Delivery Address</span>
                  </label>
                  <textarea
                    name="address"
                    value={orderDetails.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full p-3 rounded-xl border ${inputClasses} focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                <div
                  className={`p-4 rounded-xl border ${buttonClasses} backdrop-blur-sm`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">
                      Estimated Delivery
                    </span>
                  </div>
                  <p className="text-sm text-green-500">20-30 minutes</p>
                </div>
              </div>
            )}

            {/* Step 3: Payment Summary */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl border border-orange-500/20 mb-4">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <h3 className="font-semibold text-lg mb-1">
                      Secure Payment
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Payment is processed securely through Razorpay
                    </p>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border ${buttonClasses} backdrop-blur-sm`}
                >
                  <h4 className="font-medium mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items ({getTotalItems()})</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-green-500">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>₹{Math.round(getTotalPrice() * 0.18)}</span>
                    </div>
                    <div className="border-t border-gray-200/20 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-green-500">
                          ₹
                          {getTotalPrice() + Math.round(getTotalPrice() * 0.18)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {error && (
                  <div
                    className={`text-red-500 text-sm p-3 rounded-xl border border-red-500/50 bg-red-500/10`}
                  >
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {Object.keys(cart).length > 0 && (
            <div className="p-6">
              <div className="space-y-4">
                {/* Total */}
                {currentStep === 1 && (
                  <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-gray-200/20">
                    <span>Total:</span>
                    <span className="text-green-500">₹{getTotalPrice()}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className={`flex-1 py-3 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 font-medium`}
                    >
                      Back
                    </button>
                  )}

                  {currentStep < 3 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={currentStep === 2 && !isDetailsValid()}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-medium ${
                        currentStep === 2 && !isDetailsValid()
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600"
                      }`}
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-medium ${
                        loading
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                      }`}
                    >
                      <span>{loading ? "Processing..." : "Place Order"}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Clear Cart Button */}
                {currentStep === 1 && (
                  <button
                    onClick={clearCart}
                    className={`w-full py-3 rounded-xl border ${buttonClasses} hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 font-medium text-red-500`}
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

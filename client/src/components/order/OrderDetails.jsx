import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderDetails } from "../../store/order/order-action";
import {
  MapPin,
  Calendar,
  Receipt,
  ShoppingBag,
  CreditCard,
  Loader2,
  Store,
  Package,
  Calculator,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { orderDetails, loading } = useSelector((state) => state.order);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";

  // Calculate price breakdown
  const calculatePriceBreakdown = () => {
    if (!orderDetails || !orderDetails.items)
      return { subtotal: 0, gst: 0, total: 0 };

    const subtotal = orderDetails.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const gst = Math.round(subtotal * 0.18 * 100) / 100; // 18% GST
    const total = orderDetails.totalPrice;

    return { subtotal, gst, total };
  };

  const { subtotal, gst, total } = calculatePriceBreakdown();

  // Loading state
  if (loading || !orderDetails || !orderDetails.restaurant) {
    return (
      <div
        className={`min-h-screen ${themeClasses} transition-all duration-500`}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p
              className={`text-lg text-center ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Loading order details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
      {/* Background gradient orbs - adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header - improved mobile spacing */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold">Order Details</h2>
              <p
                className={`text-xs sm:text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } truncate`}
              >
                Order ID: #{orderId}
              </p>
            </div>
          </div>
        </div>

        {/* Restaurant Info Card - improved mobile layout */}
        <div
          className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border ${cardClasses} backdrop-blur-sm mb-4 sm:mb-6`}
        >
          <div className="flex items-start space-x-3 sm:space-x-4">
            {orderDetails.restaurant.image && (
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={orderDetails.restaurant.image}
                    alt={orderDetails.restaurant.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/assets/norestaurant.png")}
                  />
                </div>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <Store className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <h3 className="text-lg sm:text-xl font-bold truncate">
                  {orderDetails.restaurant.name}
                </h3>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span
                  className={`text-xs sm:text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } leading-tight`}
                >
                  {orderDetails.restaurant.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border ${cardClasses} backdrop-blur-sm`}
            >
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Order Items</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div
                    key={item.menuItemId || index}
                    className={`flex justify-between items-start sm:items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                      isDarkMode ? "bg-gray-700/30" : "bg-gray-100/50"
                    } transition-all duration-300`}
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <h4 className="font-semibold text-sm sm:text-base truncate">
                        {item.name}
                      </h4>
                      <p
                        className={`text-xs sm:text-sm mt-1 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-bold text-orange-500 text-sm sm:text-base">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Meta Information - improved mobile layout */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200/20">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-1 sm:p-1.5 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    </div>
                    <span
                      className={`text-xs sm:text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Ordered on{" "}
                      {new Date(orderDetails.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-1 sm:p-1.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg mt-0.5">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs sm:text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Delivery Address:
                      </p>
                      <p
                        className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {orderDetails.deliveryAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown - better mobile handling */}
          <div>
            <div
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border ${cardClasses} backdrop-blur-sm lg:sticky lg:top-8`}
            >
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Bill Summary</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span
                      className={`text-xs sm:text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Subtotal
                    </span>
                  </div>
                  <span className="font-medium text-sm sm:text-base">
                    ₹{subtotal}
                  </span>
                </div>

                {/* GST/Tax */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                    <span
                      className={`text-xs sm:text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      GST (18%)
                    </span>
                  </div>
                  <span className="font-medium text-blue-500 text-sm sm:text-base">
                    ₹{gst}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200/20 my-3 sm:my-4"></div>

                {/* Total - responsive sizing */}
                <div className="flex justify-between items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                    <span className="font-bold text-sm sm:text-lg">
                      Total Amount
                    </span>
                  </div>
                  <span className="font-bold text-lg sm:text-2xl text-orange-500">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Payment Status Badge - improved mobile design */}
              <div className="mt-4 sm:mt-6">
                <div className="flex items-center justify-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-500">
                    Payment Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchOrderDetails } from "../../store/order/order-action";
// import LoadingSpinner from "../LoadingSpinner"; // Adjust path as needed
// // import "../../CSS/OrderDetails.css"; // Create this CSS file
// import "../order/OrderDetails.css"; // Create this CSS file

// const OrderDetails = () => {
//   const dispatch = useDispatch();
//   const { orderId } = useParams();
//   const { orderDetails } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(fetchOrderDetails(orderId));
//   }, [dispatch, orderId]);

//   if (!orderDetails || !orderDetails.restaurant) {
//     return (
//       <div className="row justify-content-around mt-5">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="details-container">
//       <p className="details-header">{orderDetails.restaurant.name}</p>
//       <h6 className="details-location">
//         <span className="material-symbols-outlined">location_on</span>
//         <span className="location">{orderDetails.restaurant.location}</span>
//       </h6>
//       <div className="details-information-container">
//         <div className="details-information">
//           <h5>Order Information</h5>
//           <section className="order-items">
//             {orderDetails.items.map((item) => (
//               <div key={item.menuItemId} className="order-item">
//                 <span>{item.name}</span>
//                 <span>
//                   ₹{item.price} x {item.quantity} = ₹
//                   {item.price * item.quantity}
//                 </span>
//               </div>
//             ))}
//           </section>
//           <section className="order-meta">
//             <span className="details">
//               <span className="material-symbols-outlined stay-icon">
//                 calendar_month
//               </span>
//               {new Date(orderDetails.createdAt).toLocaleDateString()}
//             </span>
//             <span className="details">
//               <span className="material-symbols-outlined stay-icon">
//                 location_on
//               </span>
//               {orderDetails.deliveryAddress}
//             </span>
//           </section>
//         </div>
//         <div className="details-total-price-container">
//           <div className="details-total-price">
//             <p className="price-header">Total Price</p>
//             <span className="price-in-number">₹{orderDetails.totalPrice}</span>
//           </div>
//         </div>
//       </div>
//       {orderDetails.restaurant.image && (
//         <div className="restaurant-image-container">
//           <img
//             src={orderDetails.restaurant.image}
//             alt={orderDetails.restaurant.name}
//             className="restaurant-image"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;

// ==================

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
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p
              className={`text-lg ${
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
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Order Details</h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Order ID: #{orderId}
              </p>
            </div>
          </div>
        </div>

        {/* Restaurant Info Card */}
        <div
          className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm mb-6`}
        >
          <div className="flex items-start space-x-4">
            {orderDetails.restaurant.image && (
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={orderDetails.restaurant.image}
                    alt={orderDetails.restaurant.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/assets/norestaurant.png")}
                  />
                </div>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Store className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-bold">
                  {orderDetails.restaurant.name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {orderDetails.restaurant.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div
              className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Order Items</h3>
              </div>

              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div
                    key={item.menuItemId || index}
                    className={`flex justify-between items-center p-4 rounded-2xl ${
                      isDarkMode ? "bg-gray-700/30" : "bg-gray-100/50"
                    } transition-all duration-300`}
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-orange-500">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Meta Information */}
              <div className="mt-6 pt-6 border-t border-gray-200/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg">
                      <Calendar className="w-4 h-4 text-green-500" />
                    </div>
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Ordered on{" "}
                      {new Date(orderDetails.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg mt-0.5">
                      <MapPin className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Delivery Address:
                      </p>
                      <p
                        className={`text-sm ${
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

          {/* Price Breakdown */}
          <div>
            <div
              className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm sticky top-8`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Bill Summary</h3>
              </div>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Subtotal
                    </span>
                  </div>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                {/* GST/Tax */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-4 h-4 text-blue-500" />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      GST (18%)
                    </span>
                  </div>
                  <span className="font-medium text-blue-500">₹{gst}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200/20 my-4"></div>

                {/* Total */}
                <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-orange-500" />
                    <span className="font-bold text-lg">Total Amount</span>
                  </div>
                  <span className="font-bold text-2xl text-orange-500">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Payment Status Badge */}
              <div className="mt-6">
                <div className="flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-500">
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

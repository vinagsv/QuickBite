// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserOrders } from "../../store/order/order-action";
// import LoadingSpinner from "../LoadingSpinner"; // Adjust path as needed

// import "../../components/order/MyOrders.css"; // Create this CSS file

// const MyOrders = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { orders, loading } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(fetchUserOrders());
//   }, [dispatch]);

//   const handleOrderClick = (orderId) => {
//     navigate(`/orders/${orderId}`);
//   };

//   if (orders.length === 0 && !loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "70vh" }}
//       >
//         <h3>No orders found.</h3>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="my-orders-container">
//         {loading && <LoadingSpinner />}
//         {!loading &&
//           orders.map((order) => (
//             <div
//               className="order-container row"
//               key={order._id}
//               onClick={() => handleOrderClick(order._id)}
//             >
//               <div className="image-container col-lg-3 col-md-3">
//                 <img
//                   className="order-img"
//                   src={
//                     order.restaurant.image && order.restaurant.image !== ""
//                       ? order.restaurant.image
//                       : "/assets/norestaurant.png"
//                   }
//                   alt={order.restaurant.name}
//                 />
//               </div>
//               <div className="order-information col-lg-9 col-md-9">
//                 <h6 className="restaurant-name">{order.restaurant.name}</h6>
//                 <div className="order-details">
//                   <span className="info">
//                     <span className="material-symbols-outlined icon">
//                       shopping_cart
//                     </span>
//                     {order.items.length} items
//                   </span>
//                   <span className="info">
//                     <span className="material-symbols-outlined icon">
//                       calendar_month
//                     </span>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <h5 className="order-price">
//                   <span className="material-symbols-outlined">payments</span>
//                   Total Price: ₹{order.totalPrice}
//                 </h5>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default MyOrders;

// =======================
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../store/order/order-action";
import {
  ShoppingCart,
  Calendar,
  CreditCard,
  Loader2,
  Receipt,
  Package,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";

  // Loading state
  if (loading) {
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
              Loading your orders...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (orders.length === 0 && !loading) {
    return (
      <div
        className={`min-h-screen ${themeClasses} transition-all duration-500`}
      >
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-96 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Package
              className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-medium mb-2">No orders found</h3>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Start exploring restaurants and place your first order!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Restaurants
            </button>
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">My Orders</h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Track and manage your order history
              </p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              onClick={() => handleOrderClick(order._id)}
              className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group`}
            >
              <div className="flex items-start space-x-4">
                {/* Restaurant Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={
                        order.restaurant.image && order.restaurant.image !== ""
                          ? order.restaurant.image
                          : "/assets/norestaurant.png"
                      }
                      alt={order.restaurant.name}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.target.src = "/assets/norestaurant.png")
                      }
                    />
                  </div>
                </div>

                {/* Order Information */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-orange-500 transition-colors duration-300">
                    {order.restaurant.name}
                  </h3>

                  {/* Order Details */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                        <ShoppingCart className="w-4 h-4 text-blue-500" />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {order.items.length} items
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg">
                        <Calendar className="w-4 h-4 text-green-500" />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg">
                      <CreditCard className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-lg font-bold text-orange-500">
                      ₹{order.totalPrice}
                    </span>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div
                  className={`self-center ${
                    isDarkMode ? "text-gray-600" : "text-gray-400"
                  } group-hover:text-orange-500 transition-colors duration-300`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

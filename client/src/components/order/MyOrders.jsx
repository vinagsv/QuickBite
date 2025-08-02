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
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p
              className={`text-lg text-center ${
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
        {/* Background gradient orbs - adjusted for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-96 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-sm">
            <Package
              className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-medium mb-2">No orders found</h3>
            <p
              className={`mb-6 text-sm sm:text-base ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Start exploring restaurants and place your first order!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
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
      {/* Background gradient orbs - adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header - improved mobile spacing */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">My Orders</h2>
              <p
                className={`text-xs sm:text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Track and manage your order history
              </p>
            </div>
          </div>
        </div>

        {/* Orders List - improved mobile layout */}
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              onClick={() => handleOrderClick(order._id)}
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group`}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                {/* Restaurant Image - responsive sizing */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
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

                {/* Order Information - improved mobile layout */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors duration-300 truncate">
                    {order.restaurant.name}
                  </h3>

                  {/* Order Details - stacked on mobile, inline on desktop */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 sm:p-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {order.items.length} items
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="p-1 sm:p-1.5 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="flex items-center space-x-2">
                    <div className="p-1 sm:p-1.5 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg">
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-orange-500">
                      ₹{order.totalPrice}
                    </span>
                  </div>
                </div>

                {/* Arrow indicator - smaller on mobile */}
                <div
                  className={`self-center ${
                    isDarkMode ? "text-gray-600" : "text-gray-400"
                  } group-hover:text-orange-500 transition-colors duration-300`}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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

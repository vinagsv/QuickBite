import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRestaurants,
  fetchAllRestaurantsData,
} from "../../store/Restaurant/restaurant-action";
import { useTheme } from "../../context/ThemeContext";
import {
  Star,
  Clock,
  ArrowLeft,
  MapPin,
  ChefHat,
  TrendingUp,
  Utensils,
  Award,
  Loader2,
} from "lucide-react";

const AllRestaurants = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchAllRestaurants());
    dispatch(fetchAllRestaurantsData());
  }, [dispatch]);

  // Extract restaurants from Redux store
  const getRestaurants = () => {
    if (!restaurants || restaurants.length === 0) return [];

    return restaurants.map((restaurant) => ({
      id: restaurant.id,
      _id: restaurant._id,
      name: restaurant.name,
      image: restaurant.image || "/assets/norestaurant.png",
      rating: restaurant.rating || 4.0, // Use restaurant's rating from API
      description: restaurant.description || "Delicious food and great service",
      location: restaurant.location || "City Center",
      time: restaurant.time || "20-30 min",
      popular: restaurant.rating >= 4.5,
      menuCount: restaurant.menu ? restaurant.menu.length : 0, // Count dishes from menu
      dishes: restaurant.menu || [], // Use menu as dishes
    }));
  };

  const processedRestaurants = getRestaurants();

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurant/${restaurant._id || restaurant.id}`, {
      state: { restaurant },
    });
  };

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";

  // Loading state
  if (loading || restaurants.length === 0) {
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
              Loading restaurants...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`min-h-screen ${themeClasses} transition-all duration-500`}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <Utensils
              className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-medium mb-2">
              Unable to load restaurants
            </h3>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {error}
            </p>
            <button
              onClick={() => {
                dispatch(fetchAllRestaurants());
                dispatch(fetchAllRestaurantsData());
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
      {/* Background decorations - responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header - mobile responsive */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <div className="flex items-start space-x-3 min-w-0 flex-1">
            <div className="flex-shrink-0">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-3xl font-bold leading-tight break-words">
                All Restaurants
              </h1>
              <p
                className={`text-xs sm:text-sm mt-1 break-words ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Discover restaurants near you
              </p>
            </div>
          </div>

          {/* Stats - responsive layout */}
          <div className="flex items-center justify-start sm:justify-center space-x-4 sm:space-x-6 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg">
                  {processedRestaurants.length}
                </span>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Restaurants
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg">
                  {processedRestaurants.filter((r) => r.popular).length}
                </span>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Popular
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {processedRestaurants.map((rest, index) => (
            <div
              key={rest.id || index}
              onClick={() => handleRestaurantClick(rest)}
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
            >
              <div className="relative mb-4">
                <div className="w-full h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/assets/norestaurant.png")}
                  />
                </div>
                {rest.popular && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-black/50 backdrop-blur-sm rounded-xl p-2">
                  <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                    <div className="flex items-center space-x-1">
                      <ChefHat className="w-3 h-3" />
                      <span>{rest.menuCount} dishes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{rest.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg sm:text-xl group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
                    {rest.name}
                  </h3>
                  {rest.description && (
                    <p
                      className={`text-xs sm:text-sm mt-1 line-clamp-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {rest.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-sm sm:text-base">
                        {rest.rating}
                      </span>
                    </div>
                    {rest.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin
                          className={`w-4 h-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm truncate max-w-24 sm:max-w-none ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {rest.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Restaurant Stats - mobile optimized */}
                <div
                  className={`pt-3 border-t ${
                    isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="flex items-center space-x-1">
                        <Utensils
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Multi-cuisine
                        </span>
                      </div>
                      {rest.popular && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-green-500 font-medium">
                            Popular
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-orange-500">
                      <span className="text-xs sm:text-sm font-medium">
                        View Menu
                      </span>
                      <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state - mobile responsive */}
        {!loading && processedRestaurants.length === 0 && (
          <div className="text-center py-12 sm:py-16 px-4">
            <Utensils
              className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-lg sm:text-xl font-medium mb-2">
              No restaurants found
            </h3>
            <p
              className={`text-sm sm:text-base ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We're working to add more restaurants to your area.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurants;

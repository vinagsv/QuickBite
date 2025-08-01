import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRestaurants } from "../../store/Restaurant/restaurant-action";
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

  const { allDishes, loading, error } = useSelector(
    (state) => state.restaurant
  );

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  // Extract restaurants from dishes data
  const getRestaurantsFromDishes = () => {
    if (!allDishes || allDishes.length === 0) return [];

    const restaurantMap = new Map();

    allDishes.forEach((dish) => {
      if (!restaurantMap.has(dish.restaurantId)) {
        restaurantMap.set(dish.restaurantId, {
          id: dish.restaurantId,
          _id: dish.restaurantId,
          name: dish.restaurantName,
          image: dish.restaurantImage || "/assets/norestaurant.png",
          rating: dish.restaurantRating || 4.0,
          description:
            dish.restaurantDescription || "Delicious food and great service",
          location: dish.restaurantLocation || "City Center",
          time: "20-30 min",
          popular: dish.restaurantRating >= 4.5,
          menuCount: 1,
          dishes: [dish],
        });
      } else {
        const existing = restaurantMap.get(dish.restaurantId);
        existing.menuCount += 1;
        existing.dishes.push(dish);
        // Update rating if current dish restaurant rating is higher
        if (dish.restaurantRating > existing.rating) {
          existing.rating = dish.restaurantRating;
        }
      }
    });

    return Array.from(restaurantMap.values());
  };

  const processedRestaurants = getRestaurantsFromDishes();

  const handleRestaurantClick = (restaurant) => {
    // Navigate to Restaurant.jsx page with restaurant ID
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
        <div className="flex items-center justify-center min-h-screen">
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
              onClick={() => dispatch(fetchAllRestaurants())}
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
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">All Restaurants</h1>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Discover amazing restaurants near you
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg">
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
              <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg">
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

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedRestaurants.map((rest, index) => (
            <div
              key={rest.id || index}
              onClick={() => handleRestaurantClick(rest)}
              className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
            >
              <div className="relative mb-4">
                <div className="w-full h-48 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/assets/norestaurant.png")}
                  />
                </div>
                {rest.popular && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-sm rounded-xl p-2">
                  <div className="flex items-center justify-between text-white text-sm">
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
                  <h3 className="font-bold text-xl group-hover:text-orange-500 transition-colors duration-300">
                    {rest.name}
                  </h3>
                  {rest.description && (
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {rest.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold">{rest.rating}</span>
                    </div>
                    {rest.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin
                          className={`w-4 h-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {rest.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Restaurant Stats */}
                <div
                  className={`pt-3 border-t ${
                    isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Utensils
                          className={`w-4 h-4 ${
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
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-medium">
                            Popular
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-orange-500">
                      <span className="text-sm font-medium">View Menu</span>
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!loading && processedRestaurants.length === 0 && (
          <div className="text-center py-16">
            <Utensils
              className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              We're working to add more restaurants to your area.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurants;

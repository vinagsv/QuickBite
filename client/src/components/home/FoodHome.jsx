import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRestaurants,
  fetchAllRestaurantsData,
} from "../../store/Restaurant/restaurant-action";
import { Star, Clock, TrendingUp, Flame, Loader2, ChefHat } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const FoodHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allDishes, restaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );
  const { isDarkMode } = useTheme();

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
      time: restaurant.time || "20-30 min",
      popular: restaurant.rating >= 4.5,
      dishCount: restaurant.menu ? restaurant.menu.length : 0, // Count dishes from menu
    }));
  };

  const popularRestaurants = getRestaurants()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // Extract popular dishes from restaurant menus
  const popularDishes = restaurants
    .flatMap((restaurant) =>
      (restaurant.menu || []).map((dish) => ({
        ...dish,
        id: dish._id,
        name: dish.name,
        image:
          dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
        rating: dish.rating || 4.0,
        trending: dish.rating >= 4.5,
        restaurantName: restaurant.name,
      }))
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

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
              Loading delicious content...
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
            <ChefHat
              className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-medium mb-2">Unable to load content</h3>
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Popular Dishes */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Popular Dishes</h2>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Trending favorites everyone loves
                </p>
              </div>
            </div>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-500/10 transition-all duration-300`}
              onClick={() => navigate("/dishes")}
            >
              <span>View all</span>
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {popularDishes.map((dish, index) => (
              <div
                key={dish.id || index}
                onClick={() =>
                  navigate(`/foods/${encodeURIComponent(dish.name)}`, {
                    state: { restaurantName: dish.restaurantName },
                  })
                }
                className="flex flex-col items-center min-w-[120px] group cursor-pointer"
              >
                <div className="relative">
                  <div
                    className={`w-28 h-28 rounded-3xl border-2 ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    } overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/assets/nofood.png")}
                    />
                  </div>
                  {dish.trending && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Flame className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="mt-3 text-sm font-medium text-center group-hover:text-orange-500 transition-colors duration-300">
                  {dish.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Restaurants */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Top Restaurants</h2>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Best rated restaurants near you
                </p>
              </div>
            </div>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300`}
              onClick={() => navigate("/restaurants")}
            >
              <span>View all</span>
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRestaurants.map((rest, index) => (
              <div
                key={rest.id || index}
                onClick={() =>
                  navigate(`/restaurant/${rest._id || rest.id}`, {
                    state: { restaurant: rest },
                  })
                }
                className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={rest.image}
                        alt={rest.name}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.target.src = "/assets/norestaurant.png")
                        }
                      />
                    </div>
                    {rest.popular && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-orange-500 transition-colors duration-300">
                      {rest.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {rest.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock
                          className={`w-4 h-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {rest.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state for dishes */}
        {!loading && popularDishes.length === 0 && (
          <div className="text-center py-16">
            <ChefHat
              className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-medium mb-2">No dishes available</h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Check back later for delicious options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodHome;

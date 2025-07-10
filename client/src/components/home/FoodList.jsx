import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Users/user-action";
import {
  Search,
  User,
  LogOut,
  Sun,
  Moon,
  Star,
  Clock,
  TrendingUp,
  Flame,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const popularDishes = [
  {
    name: "Biryani",
    image: "/assets/foods/biryani.jpg",
    trending: true,
  },
  { name: "Pizza", image: "/assets/foods/pizza.jpg", trending: false },
  { name: "Burger", image: "/assets/foods/burger.jpg", trending: true },
  { name: "Chicken", image: "/assets/foods/chicken.jpg", trending: false },
  { name: "Sandwich", image: "/assets/foods/sandwich.jpg", trending: false },
  { name: "Cake", image: "/assets/foods/cake.jpeg", trending: true },
];

const popularRestaurants = [
  {
    name: "Meghana Foods",
    image: "/meghana.png",
    time: "25 min",
    rating: 4.5,
    popular: true,
  },
  {
    name: "Empire",
    image: "/empire.png",
    time: "30 min",
    rating: 4.3,
    popular: false,
  },
  {
    name: "KFC",
    image: "/kfc.png",
    time: "28 min",
    rating: 4.1,
    popular: true,
  },
  {
    name: "Truffles",
    image: "/truffles.png",
    time: "35 min",
    rating: 4.4,
    popular: false,
  },
  {
    name: "Domino's",
    image: "/dominos.png",
    time: "20 min",
    rating: 4.2,
    popular: true,
  },
  {
    name: "Nandhini",
    image: "/nandhini.png",
    time: "32 min",
    rating: 4.6,
    popular: false,
  },
];

const FoodList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";

  const inputClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
    : "bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500";

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}

        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                QuickBite
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Delicious food, delivered fast
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search for food, restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-80 pl-12 pr-4 py-3 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
              />
            </div>

            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl border ${cardClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated && (
              <button
                onClick={() => navigate("/profile")}
                className={`p-3 rounded-xl border ${cardClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
                title="View Profile"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {isAuthenticated ? (
              <button
                onClick={logoutHandler}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>

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
                key={index}
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
                key={index}
                className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={rest.image}
                        alt={rest.name}
                        className="w-full h-full object-cover"
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
      </div>
    </div>
  );
};

export default FoodList;

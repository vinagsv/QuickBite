import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRestaurants } from "../../store/Restaurant/restaurant-action";
import { Search as SearchIcon, Utensils, ChefHat, Loader2 } from "lucide-react";

const Search = ({ isDarkMode }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allDishes, loading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    // Only fetch if allDishes is empty to prevent redundant calls
    if (!allDishes || allDishes.length === 0) {
      dispatch(fetchAllRestaurants());
    }
  }, [dispatch, allDishes]);

  const handleSelect = (item) => {
    if (item.type === "restaurant") {
      navigate(`/restaurant/${item.id}`, {
        state: { restaurant: item },
      });
    } else if (item.type === "food") {
      navigate(`/foods/${encodeURIComponent(item.name)}`);
    }
  };

  const getSuggestions = () => {
    if (!allDishes || allDishes.length === 0) return [];

    const lowerQuery = query.toLowerCase();

    // Group dishes by restaurant to extract restaurant data
    const restaurants = [];
    const restaurantMap = new Map();
    allDishes.forEach((dish) => {
      if (!restaurantMap.has(dish.restaurantId)) {
        restaurantMap.set(dish.restaurantId, {
          id: dish.restaurantId,
          name: dish.restaurantName || "Unknown Restaurant",
        });
      }
    });
    restaurantMap.forEach((restaurant) => restaurants.push(restaurant));

    const matchedRestaurants = restaurants
      .filter((r) => r.name.toLowerCase().includes(lowerQuery))
      .map((r) => ({
        id: r.id,
        name: r.name,
        type: "restaurant",
      }));

    const matchedFoods = [];
    allDishes.forEach((dish) => {
      if (
        dish.name.toLowerCase().includes(lowerQuery) &&
        !matchedFoods.some((f) => f.name === dish.name)
      ) {
        matchedFoods.push({ name: dish.name, type: "food" });
      }
    });

    return [...matchedRestaurants, ...matchedFoods].slice(0, 10);
  };

  const suggestions = query.length > 0 ? getSuggestions() : [];

  const inputClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
    : "bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500";

  const suggestionItemClasses = isDarkMode
    ? "hover:bg-gray-700 text-white"
    : "hover:bg-gray-100 text-gray-900";

  const suggestionBoxClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";

  if (loading && (!allDishes || allDishes.length === 0)) {
    return (
      <div className="relative w-80 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-80">
        <div
          className={`flex items-center border rounded-2xl px-4 py-2 shadow backdrop-blur-sm ${inputClasses}`}
        >
          <SearchIcon
            className={`w-5 h-5 mr-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search for food or restaurants..."
            className="w-full outline-none bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div
          className={`absolute z-50 mt-2 w-full rounded-lg shadow-xl p-4 ${suggestionBoxClasses}`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Error loading suggestions: {error}
          </p>
          <button
            onClick={() => dispatch(fetchAllRestaurants())}
            className="mt-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-80">
      <div
        className={`flex items-center border rounded-2xl px-4 py-2 shadow backdrop-blur-sm ${inputClasses}`}
      >
        <SearchIcon
          className={`w-5 h-5 mr-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <input
          type="text"
          placeholder="Search for food or restaurants..."
          className="w-full outline-none bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {suggestions.length > 0 && (
        <div
          className={`absolute z-50 mt-2 w-full rounded-lg shadow-xl ${suggestionBoxClasses}`}
        >
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(item)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${suggestionItemClasses}`}
            >
              {item.type === "restaurant" ? (
                <ChefHat className="w-4 h-4 text-blue-500" />
              ) : (
                <Utensils className="w-4 h-4 text-green-500" />
              )}
              <span className="truncate">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRestaurants } from "../../store/Restaurant/restaurant-action";
import { Search as SearchIcon, Utensils, ChefHat, Loader2 } from "lucide-react";

const Search = ({ isDarkMode }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionPosition, setSuggestionPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const searchRef = useRef(null);
  const inputRef = useRef(null);
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

  // Update suggestion position when input position changes
  useEffect(() => {
    if (showSuggestions && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768; // md breakpoint

      if (isMobile) {
        // On mobile, use full width with padding
        setSuggestionPosition({
          top: rect.bottom + window.scrollY + 4,
          left: 16, // 1rem padding
          width: window.innerWidth - 32, // full width minus padding
        });
      } else {
        // Desktop behavior unchanged
        setSuggestionPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }
  }, [showSuggestions, query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    const handleScroll = () => {
      if (showSuggestions) {
        setShowSuggestions(false);
      }
    };

    const handleResize = () => {
      if (showSuggestions) {
        // Update position on resize
        if (inputRef.current) {
          const rect = inputRef.current.getBoundingClientRect();
          const isMobile = window.innerWidth < 768;

          if (isMobile) {
            setSuggestionPosition({
              top: rect.bottom + window.scrollY + 4,
              left: 16,
              width: window.innerWidth - 32,
            });
          } else {
            setSuggestionPosition({
              top: rect.bottom + window.scrollY + 4,
              left: rect.left + window.scrollX,
              width: rect.width,
            });
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [showSuggestions]);

  const handleSelect = (item) => {
    console.log("Selecting item:", item); // Debug log

    setQuery("");
    setShowSuggestions(false);

    if (item.type === "restaurant") {
      console.log("Navigating to restaurant:", item.id); // Debug log
      navigate(`/restaurant/${item.id}`, {
        state: { restaurant: item },
      });
    } else if (item.type === "food") {
      console.log("Navigating to food:", item.name); // Debug log
      navigate(`/foods/${encodeURIComponent(item.name)}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleInputFocus = () => {
    if (query.length > 0) {
      setShowSuggestions(true);
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
          _id: dish.restaurantId, // Add _id for navigation
          name: dish.restaurantName || "Unknown Restaurant",
        });
      }
    });
    restaurantMap.forEach((restaurant) => restaurants.push(restaurant));

    const matchedRestaurants = restaurants
      .filter((r) => r.name.toLowerCase().includes(lowerQuery))
      .map((r) => ({
        id: r.id,
        _id: r._id,
        name: r.name,
        type: "restaurant",
      }));

    const matchedFoods = [];
    allDishes.forEach((dish) => {
      if (
        dish.name.toLowerCase().includes(lowerQuery) &&
        !matchedFoods.some((f) => f.name === dish.name)
      ) {
        matchedFoods.push({
          name: dish.name,
          type: "food",
          _id: dish._id, // Add dish ID for potential future use
        });
      }
    });

    console.log(
      "Generated suggestions:",
      [...matchedRestaurants, ...matchedFoods].slice(0, 10)
    ); // Debug log
    return [...matchedRestaurants, ...matchedFoods].slice(0, 10);
  };

  const suggestions = query.length > 0 ? getSuggestions() : [];

  const inputClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
    : "bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500";

  const suggestionItemClasses = isDarkMode
    ? "hover:bg-gray-700/80 text-white"
    : "hover:bg-gray-100/80 text-gray-900";

  const suggestionBoxClasses = isDarkMode
    ? "bg-gray-800/50 text-white border-gray-700/50"
    : "bg-white/70 text-gray-900 border-gray-200/50";

  // Suggestions dropdown component
  const SuggestionsDropdown = () => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return createPortal(
      <div
        className={`fixed rounded-lg shadow-2xl border backdrop-blur-md ${suggestionBoxClasses}`}
        style={{
          top: `${suggestionPosition.top}px`,
          left: `${suggestionPosition.left}px`,
          width: `${suggestionPosition.width}px`,
          zIndex: 999999,
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {suggestions.map((item, idx) => (
          <div
            key={`${item.type}-${item.name || item.id}-${idx}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Clicked item:", item); // Debug log
              handleSelect(item);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`flex items-center gap-3 px-3 sm:px-4 py-3 cursor-pointer transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${suggestionItemClasses}`}
            style={{ userSelect: "none" }}
          >
            {item.type === "restaurant" ? (
              <ChefHat className="w-4 h-4 text-blue-500 flex-shrink-0" />
            ) : (
              <Utensils className="w-4 h-4 text-green-500 flex-shrink-0" />
            )}
            <span className="truncate flex-1 text-sm sm:text-base">
              {item.name}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                item.type === "restaurant"
                  ? "bg-blue-500/10 text-blue-500"
                  : "bg-green-500/10 text-green-500"
              }`}
            >
              {item.type === "restaurant" ? "Restaurant" : "Food"}
            </span>
          </div>
        ))}
      </div>,
      document.body
    );
  };

  if (loading && (!allDishes || allDishes.length === 0)) {
    return (
      <div className="relative w-full md:w-80 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div ref={searchRef} className="relative w-full md:w-80">
        <div
          ref={inputRef}
          className={`flex items-center border rounded-2xl px-3 sm:px-4 py-2 shadow backdrop-blur-sm ${inputClasses}`}
        >
          <SearchIcon
            className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search for food or restaurants..."
            className="w-full outline-none bg-transparent text-sm sm:text-base"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div
          className={`absolute z-[999999] mt-2 w-full rounded-lg shadow-2xl border backdrop-blur-md p-3 sm:p-4 ${suggestionBoxClasses}`}
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
            className="mt-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={searchRef} className="relative w-full md:w-80">
      <div
        ref={inputRef}
        className={`flex items-center border rounded-2xl px-3 sm:px-4 py-2 shadow backdrop-blur-sm ${inputClasses}`}
      >
        <SearchIcon
          className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <input
          type="text"
          placeholder="Search for food or restaurants..."
          className="w-full outline-none bg-transparent text-sm sm:text-base"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </div>

      <SuggestionsDropdown />
    </div>
  );
};

export default Search;

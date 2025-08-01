// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllRestaurants,
//   fetchRestaurantById,
// } from "../../store/Restaurant/restaurant-action";
// import { useTheme } from "../../context/ThemeContext";
// import { useCart } from "../home/Checkout";
// import {
//   ArrowLeft,
//   Star,
//   Clock,
//   MapPin,
//   Plus,
//   Minus,
//   ChefHat,
//   Leaf,
//   Flame,
//   Award,
//   Heart,
//   Share2,
//   Loader,
// } from "lucide-react";

// const Restaurant = () => {
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const location = useLocation();
//   const { addToCart, cart, removeFromCart } = useCart();

//   const { allDishes, selectedRestaurant, loading, restaurantLoading, error } =
//     useSelector((state) => state.restaurant);

//   const [filterType, setFilterType] = useState("all");
//   const [restaurant, setRestaurant] = useState(null);
//   const [restaurantDishes, setRestaurantDishes] = useState([]);

//   useEffect(() => {
//     if (!allDishes || allDishes.length === 0) {
//       dispatch(fetchAllRestaurants());
//     }

//     if (!location.state?.restaurant && id) {
//       dispatch(fetchRestaurantById(id));
//     }
//   }, [dispatch, allDishes, id, location.state]);

//   useEffect(() => {
//     if (location.state?.restaurant) {
//       const restaurantData = {
//         ...location.state.restaurant,
//         image:
//           location.state.restaurant.image &&
//           location.state.restaurant.image !== ""
//             ? location.state.restaurant.image
//             : "/assets/norestaurant.png",
//       };
//       setRestaurant(restaurantData);
//     } else if (selectedRestaurant) {
//       setRestaurant(selectedRestaurant);
//     }
//   }, [location.state, selectedRestaurant]);

//   useEffect(() => {
//     if (allDishes && allDishes.length > 0 && restaurant) {
//       const dishes = allDishes.filter((dish) => {
//         return (
//           dish.restaurantName === restaurant.name ||
//           dish.restaurantId === restaurant._id ||
//           dish.restaurantId === restaurant.id ||
//           (dish.restaurantName &&
//             restaurant.name &&
//             dish.restaurantName.toLowerCase() === restaurant.name.toLowerCase())
//         );
//       });

//       console.log("Filtered dishes for restaurant:", dishes);
//       setRestaurantDishes(dishes);
//     }
//   }, [allDishes, restaurant]);

//   if (loading || restaurantLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-16 h-16 mx-auto mb-4 text-orange-500 animate-spin" />
//           <h3 className="text-xl font-medium mb-2">Loading restaurant...</h3>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <ChefHat className="w-16 h-16 mx-auto mb-4 text-red-400" />
//           <h3 className="text-xl font-medium mb-2 text-red-600">
//             Error loading data
//           </h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => {
//               dispatch(fetchAllRestaurants());
//             }}
//             className="px-4 py-2 bg-orange-500 text-white rounded-lg mr-2"
//           >
//             Retry
//           </button>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-500 text-white rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!restaurant) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <ChefHat className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//           <h3 className="text-xl font-medium mb-2">Restaurant not found</h3>
//           <p className="text-gray-600 mb-4">
//             The restaurant you're looking for doesn't exist.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-orange-500 text-white rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const menuItems = restaurantDishes.map((dish) => ({
//     ...dish,
//     image: dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
//     type: dish.ingredients === "veg" ? "veg" : "nonveg",
//     trending: dish.rating >= 4.5,
//   }));

//   const filteredMenuItems = menuItems.filter((dish) => {
//     if (filterType === "all") return true;
//     if (filterType === "veg") return dish.type === "veg";
//     if (filterType === "nonveg") return dish.type === "nonveg";
//     return true;
//   });

//   const themeClasses = isDarkMode
//     ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
//     : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

//   const cardClasses = isDarkMode
//     ? "bg-gray-800/50 border-gray-700/50"
//     : "bg-white/70 border-gray-200/50";

//   const buttonClasses = isDarkMode
//     ? "bg-gray-700/50 hover:bg-gray-600/50 border-gray-600/50"
//     : "bg-white/70 hover:bg-gray-50/70 border-gray-300/50";

//   return (
//     <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10  w-72 h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-96 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-4"></div>
//         </div>

//         <div
//           className={`p-8 rounded-3xl border ${cardClasses} backdrop-blur-sm mb-8`}
//         >
//           <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
//             <div className="relative">
//               <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl">
//                 <img
//                   src={restaurant.image}
//                   alt={restaurant.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => (e.target.src = "/assets/norestaurant.png")}
//                 />
//               </div>
//               {restaurant.rating >= 4.5 && (
//                 <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
//                   <Award className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>

//             <div className="flex-1">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
//                   <p
//                     className={`text-lg mb-4 ${
//                       isDarkMode ? "text-gray-300" : "text-gray-700"
//                     }`}
//                   >
//                     {restaurant.description}
//                   </p>

//                   <div className="flex flex-wrap items-center gap-6 mb-4">
//                     <div className="flex items-center space-x-2">
//                       <Star className="w-5 h-5 text-yellow-500 fill-current" />
//                       <span className="font-bold text-lg">
//                         {restaurant.rating}
//                       </span>
//                       <span
//                         className={`text-sm ${
//                           isDarkMode ? "text-gray-400" : "text-gray-600"
//                         }`}
//                       >
//                         (500+ reviews)
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Clock
//                         className={`w-5 h-5 ${
//                           isDarkMode ? "text-gray-400" : "text-gray-600"
//                         }`}
//                       />
//                       <span
//                         className={`${
//                           isDarkMode ? "text-gray-400" : "text-gray-600"
//                         }`}
//                       >
//                         20-30 min
//                       </span>
//                     </div>
//                     {restaurant.location && (
//                       <div className="flex items-center space-x-2">
//                         <MapPin
//                           className={`w-5 h-5 ${
//                             isDarkMode ? "text-gray-400" : "text-gray-600"
//                           }`}
//                         />
//                         <span
//                           className={`${
//                             isDarkMode ? "text-gray-400" : "text-gray-600"
//                           }`}
//                         >
//                           {restaurant.location}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         isDarkMode
//                           ? "bg-green-900/50 text-green-400"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {menuItems.length} Dishes
//                     </span>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         isDarkMode
//                           ? "bg-blue-900/50 text-blue-400"
//                           : "bg-blue-100 text-blue-700"
//                       }`}
//                     >
//                       Pure Veg Available
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex space-x-2">
//                   <button
//                     className={`p-3 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
//                   >
//                     <Heart className="w-5 h-5" />
//                   </button>
//                   <button
//                     className={`p-3 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
//                   >
//                     <Share2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
//               <ChefHat className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold">Menu</h2>
//               <p
//                 className={`text-sm ${
//                   isDarkMode ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 Choose from our delicious menu
//               </p>
//             </div>
//           </div>

//           <div className="flex space-x-2">
//             {[
//               { key: "all", label: "All", icon: ChefHat },
//               { key: "veg", label: "Vegetarian", icon: Leaf },
//               { key: "nonveg", label: "Non-Veg", icon: Flame },
//             ].map(({ key, label, icon: Icon }) => (
//               <button
//                 key={key}
//                 onClick={() => setFilterType(key)}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
//                   filterType === key
//                     ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent"
//                     : `${buttonClasses} backdrop-blur-sm`
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span>{label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredMenuItems.map((dish) => (
//             <div
//               key={dish._id}
//               className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
//             >
//               <div className="relative mb-4">
//                 <div className="w-full h-48 rounded-2xl overflow-hidden shadow-md">
//                   <img
//                     src={dish.image}
//                     alt={dish.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     onError={(e) => (e.target.src = "/assets/nofood.png")}
//                   />
//                 </div>
//                 {dish.trending && (
//                   <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
//                     <Flame className="w-4 h-4 text-white" />
//                   </div>
//                 )}
//                 <div
//                   className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${
//                     dish.type === "veg"
//                       ? "bg-green-500/90 text-white"
//                       : "bg-red-500/90 text-white"
//                   }`}
//                 >
//                   {dish.type === "veg" ? (
//                     <Leaf className="w-3 h-3" />
//                   ) : (
//                     <Flame className="w-3 h-3" />
//                   )}
//                   <span>{dish.type === "veg" ? "VEG" : "NON-VEG"}</span>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div>
//                   <h3 className="font-bold text-lg group-hover:text-orange-500 transition-colors duration-300">
//                     {dish.name}
//                   </h3>
//                   <p
//                     className={`text-sm ${
//                       isDarkMode ? "text-gray-300" : "text-gray-700"
//                     }`}
//                   >
//                     {dish.description}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <span className="text-xl font-bold text-green-500">
//                       ₹{dish.price}
//                     </span>
//                     <div className="flex items-center space-x-1">
//                       <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                       <span className="text-sm font-medium">{dish.rating}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-3 border-t border-gray-200/20">
//                   {cart[dish._id] ? (
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => removeFromCart(dish._id)}
//                         className={`p-1 rounded-lg border ${buttonClasses} hover:scale-105 transition-all duration-300`}
//                       >
//                         <Minus className="w-3 h-3" />
//                       </button>
//                       <span className="w-8 text-center text-sm font-medium">
//                         {cart[dish._id].quantity}
//                       </span>
//                       <button
//                         onClick={() => addToCart(dish)}
//                         className={`p-1 rounded-lg border ${buttonClasses} hover:scale-105 transition-all duration-300`}
//                       >
//                         <Plus className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => addToCart(dish)}
//                       className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
//                     >
//                       <Plus className="w-4 h-4" />
//                       <span>Add to Cart</span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredMenuItems.length === 0 && (
//           <div className="text-center py-16">
//             <ChefHat
//               className={`w-16 h-16 mx-auto mb-4 ${
//                 isDarkMode ? "text-gray-600" : "text-gray-400"
//               }`}
//             />
//             <h3 className="text-xl font-medium mb-2">No dishes found</h3>
//             <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
//               Try adjusting your filters to see more options.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Restaurant;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRestaurants,
  fetchAllRestaurantsData,
  fetchRestaurantById,
} from "../../store/Restaurant/restaurant-action";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../home/Checkout";
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Plus,
  Minus,
  ChefHat,
  Leaf,
  Flame,
  Award,
  Heart,
  Share2,
  Loader,
} from "lucide-react";

const Restaurant = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const { addToCart, cart, removeFromCart } = useCart();

  const {
    allDishes,
    restaurants,
    selectedRestaurant,
    loading,
    restaurantLoading,
    error,
  } = useSelector((state) => state.restaurant);

  const [filterType, setFilterType] = useState("all");
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantDishes, setRestaurantDishes] = useState([]);

  useEffect(() => {
    dispatch(fetchAllRestaurants());
    dispatch(fetchAllRestaurantsData()); // Fetch restaurants data
    if (id) {
      dispatch(fetchRestaurantById(id)); // Fetch specific restaurant
    }
  }, [dispatch, id]);

  useEffect(() => {
    // Prioritize restaurants array for restaurant data
    const foundRestaurant = restaurants.find(
      (r) => r._id === id || r.id === id
    );

    if (foundRestaurant) {
      setRestaurant({
        ...foundRestaurant,
        image:
          foundRestaurant.image && foundRestaurant.image !== ""
            ? foundRestaurant.image
            : "/assets/norestaurant.png",
      });
    } else if (location.state?.restaurant) {
      setRestaurant({
        ...location.state.restaurant,
        image:
          location.state.restaurant.image &&
          location.state.restaurant.image !== ""
            ? location.state.restaurant.image
            : "/assets/norestaurant.png",
      });
    } else if (selectedRestaurant) {
      setRestaurant(selectedRestaurant);
    }
  }, [restaurants, location.state, selectedRestaurant, id]);

  useEffect(() => {
    if (restaurant) {
      // Use menu from selectedRestaurant if available (from /restaurants endpoint)
      let dishes = [];
      if (selectedRestaurant?.menu && selectedRestaurant._id === id) {
        dishes = selectedRestaurant.menu.map((dish) => ({
          ...dish,
          restaurantId: selectedRestaurant._id,
          restaurantName: selectedRestaurant.name,
          restaurantImage: selectedRestaurant.image,
          restaurantRating: selectedRestaurant.rating || 4.0,
        }));
      } else if (allDishes && allDishes.length > 0) {
        // Fallback to filtering from allDishes
        dishes = allDishes.filter((dish) => {
          return (
            dish.restaurantName === restaurant.name ||
            dish.restaurantId === restaurant._id ||
            dish.restaurantId === restaurant.id ||
            (dish.restaurantName &&
              restaurant.name &&
              dish.restaurantName.toLowerCase() ===
                restaurant.name.toLowerCase())
          );
        });
      }

      console.log("Filtered dishes for restaurant:", dishes);
      setRestaurantDishes(dishes);
    }
  }, [allDishes, restaurant, selectedRestaurant]);

  if (loading || restaurantLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 mx-auto mb-4 text-orange-500 animate-spin" />
          <h3 className="text-xl font-medium mb-2">Loading restaurant...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h3 className="text-xl font-medium mb-2 text-red-600">
            Error loading data
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              dispatch(fetchAllRestaurants());
              dispatch(fetchAllRestaurantsData());
              dispatch(fetchRestaurantById(id));
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg mr-2"
          >
            Retry
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-medium mb-2">Restaurant not found</h3>
          <p className="text-gray-600 mb-4">
            The restaurant you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const menuItems = restaurantDishes.map((dish) => ({
    ...dish,
    image: dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
    type: dish.ingredients === "veg" ? "veg" : "nonveg",
    trending: dish.rating >= 4.5,
  }));

  const filteredMenuItems = menuItems.filter((dish) => {
    if (filterType === "all") return true;
    if (filterType === "veg") return dish.type === "veg";
    if (filterType === "nonveg") return dish.type === "nonveg";
    return true;
  });

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";

  const buttonClasses = isDarkMode
    ? "bg-gray-700/50 hover:bg-gray-600/50 border-gray-600/50"
    : "bg-white/70 hover:bg-gray-50/70 border-gray-300/50";

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4"></div>
        </div>

        <div
          className={`p-8 rounded-3xl border ${cardClasses} backdrop-blur-sm mb-8`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/assets/norestaurant.png")}
                />
              </div>
              {restaurant.rating >= 4.5 && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                  <p
                    className={`text-lg mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {restaurant.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg">
                        {restaurant.rating || 4.0}
                      </span>
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        (500+ reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock
                        className={`w-5 h-5 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      />
                      <span
                        className={`${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {restaurant.time || "20-30 min"}
                      </span>
                    </div>
                    {restaurant.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin
                          className={`w-5 h-5 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        />
                        <span
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {restaurant.location}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDarkMode
                          ? "bg-green-900/50 text-green-400"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {menuItems.length} Dishes
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDarkMode
                          ? "bg-blue-900/50 text-blue-400"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      Pure Veg Available
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    className={`p-3 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    className={`p-3 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Menu</h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Choose from our delicious menu
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            {[
              { key: "all", label: "All", icon: ChefHat },
              { key: "veg", label: "Vegetarian", icon: Leaf },
              { key: "nonveg", label: "Non-Veg", icon: Flame },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilterType(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                  filterType === key
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent"
                    : `${buttonClasses} backdrop-blur-sm`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((dish) => (
            <div
              key={dish._id}
              className={`p-6 rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
            >
              <div className="relative mb-4">
                <div className="w-full h-48 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/assets/nofood.png")}
                  />
                </div>
                {dish.trending && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${
                    dish.type === "veg"
                      ? "bg-green-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {dish.type === "veg" ? (
                    <Leaf className="w-3 h-3" />
                  ) : (
                    <Flame className="w-3 h-3" />
                  )}
                  <span>{dish.type === "veg" ? "VEG" : "NON-VEG"}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg group-hover:text-orange-500 transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {dish.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-green-500">
                      ₹{dish.price}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {dish.rating || 4.0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200/20">
                  {cart[dish._id] ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(dish._id)}
                        className={`p-1 rounded-lg border ${buttonClasses} hover:scale-105 transition-all duration-300`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {cart[dish._id].quantity}
                      </span>
                      <button
                        onClick={() => addToCart(dish)}
                        className={`p-1 rounded-lg border ${buttonClasses} hover:scale-105 transition-all duration-300`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(dish)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="text-center py-16">
            <ChefHat
              className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-medium mb-2">No dishes found</h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Try adjusting your filters to see more options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;

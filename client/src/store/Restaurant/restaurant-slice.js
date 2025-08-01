import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllRestaurants,
  fetchAllRestaurantsData,
  fetchRestaurantById,
  fetchFoodsByName,
} from "./restaurant-action";

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [], // actual restaurant objects
    allDishes: [], // all dishes from all restaurants
    filteredDishes: [],
    selectedRestaurant: null, // currently selected restaurant
    restaurantDishes: [], // dishes for selected restaurant
    loading: false,
    error: null,
    restaurantLoading: false, // separate loading for restaurant details
    dishesLoading: false, // separate loading for dishes
  },
  reducers: {
    filterDishesBySearch(state, action) {
      const query = action.payload.toLowerCase();
      state.filteredDishes = state.allDishes.filter(
        (dish) =>
          dish.name.toLowerCase().includes(query) ||
          dish.ingredients.toLowerCase().includes(query) ||
          dish.restaurantName.toLowerCase().includes(query)
      );
    },
    clearError(state) {
      state.error = null;
    },
    setSelectedRestaurant(state, action) {
      state.selectedRestaurant = action.payload;
    },
    clearSelectedRestaurant(state) {
      state.selectedRestaurant = null;
      state.restaurantDishes = [];
    },
    setRestaurantDishes(state, action) {
      state.restaurantDishes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllRestaurants (dishes)
      .addCase(fetchAllRestaurants.pending, (state) => {
        state.dishesLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.dishesLoading = false;
        state.loading = false;
        state.error = null;

        const enhancedDishes = action.payload.map((dish) => ({
          ...dish,
          id: dish._id,
          image:
            dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
          trending: dish.rating >= 4.5,
          type: dish.ingredients,
        }));

        state.allDishes = enhancedDishes;
        state.filteredDishes = enhancedDishes;
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
        state.dishesLoading = false;
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Handle fetchAllRestaurantsData (actual restaurant objects)
      .addCase(fetchAllRestaurantsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRestaurantsData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.restaurants = action.payload.map((restaurant) => ({
          ...restaurant,
          id: restaurant._id,
          image:
            restaurant.image && restaurant.image !== ""
              ? restaurant.image
              : "/assets/norestaurant.png",
        }));
      })
      .addCase(fetchAllRestaurantsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      })

      // Handle fetchRestaurantById
      .addCase(fetchRestaurantById.pending, (state) => {
        state.restaurantLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.restaurantLoading = false;
        state.error = null;
        state.selectedRestaurant = {
          ...action.payload,
          id: action.payload._id,
          image:
            action.payload.image && action.payload.image !== ""
              ? action.payload.image
              : "/assets/norestaurant.png",
        };
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.restaurantLoading = false;
        state.error = action.payload || "Failed to fetch restaurant";
      })

      // Handle fetchFoodsByName
      .addCase(fetchFoodsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.filteredDishes = action.payload.map((dish) => ({
          ...dish,
          id: dish._id,
          image:
            dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
          trending: dish.rating >= 4.5,
          type: dish.ingredients,
        }));
      })
      .addCase(fetchFoodsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch foods";
      });
  },
});

export const {
  filterDishesBySearch,
  clearError,
  setSelectedRestaurant,
  clearSelectedRestaurant,
  setRestaurantDishes,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;

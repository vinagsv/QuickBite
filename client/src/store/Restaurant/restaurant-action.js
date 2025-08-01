import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3031";

// Fetch all dishes (existing action)
export const fetchAllRestaurants = createAsyncThunk(
  "restaurant/fetchAllRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/app/dishes`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched dishes:", data);

      if (data.status === "success") {
        return data.data || [];
      } else {
        return rejectWithValue(data.message || "Failed to fetch dishes");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

// Fetch all restaurants (new action)
export const fetchAllRestaurantsData = createAsyncThunk(
  "restaurant/fetchAllRestaurantsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/app/restaurants`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched restaurants:", data);

      if (data.status === "success") {
        return data.data || [];
      } else {
        return rejectWithValue(data.message || "Failed to fetch restaurants");
      }
    } catch (error) {
      console.error("Fetch restaurants error:", error);
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

// Fetch restaurant by ID (new action)
export const fetchRestaurantById = createAsyncThunk(
  "restaurant/fetchRestaurantById",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/app/restaurant/${restaurantId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched restaurant by ID:", data);

      if (data.status === "success") {
        return data.data || null;
      } else {
        return rejectWithValue(data.message || "Failed to fetch restaurant");
      }
    } catch (error) {
      console.error("Fetch restaurant by ID error:", error);
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

// Fetch foods by name
export const fetchFoodsByName = createAsyncThunk(
  "restaurant/fetchFoodsByName",
  async (foodName, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/app/foods/${foodName}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched foods by name:", data);

      if (data.status === "success") {
        return data.data || [];
      } else {
        return rejectWithValue(data.message || "Failed to fetch foods");
      }
    } catch (error) {
      console.error("Fetch foods by name error:", error);
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

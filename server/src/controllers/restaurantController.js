import Restaurant from "../models/restaurantModel.js";

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      status: "success",
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.status(200).json({
        status: "success",
        data: restaurant,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    const allFoods = restaurants.flatMap((rest) =>
      rest.menu.map((item) => ({
        ...item.toObject(),
        restaurantId: rest._id,
        restaurantName: rest.name,
      }))
    );

    res.status(200).json({
      status: "success",
      total: allFoods.length,
      data: allFoods,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch foods",
      error: error.message,
    });
  }
};

const getFoodsByName = async (req, res) => {
  try {
    const foodName = req.params.foodName.toLowerCase();
    const restaurants = await Restaurant.find();
    const matchedFoods = restaurants.flatMap((rest) =>
      rest.menu
        .filter((item) => item.name.toLowerCase().includes(foodName))
        .map((item) => ({
          ...item.toObject(),
          restaurantId: rest._id,
          restaurantName: rest.name,
        }))
    );

    if (matchedFoods.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No matching food items found",
      });
    }

    res.status(200).json({
      status: "success",
      total: matchedFoods.length,
      data: matchedFoods,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving foods",
      error: error.message,
    });
  }
};

export { getAllRestaurants, getRestaurantById, getAllFoods, getFoodsByName };

import express from "express";
import {
  getAllRestaurants,
  getRestaurantById,
  getAllFoods,
  getFoodsByName,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/restaurants", getAllRestaurants);
router.get("/restaurant/:id", getRestaurantById);
router.get("/dishes", getAllFoods);
router.get("/foods/:foodName", getFoodsByName);

export default router;

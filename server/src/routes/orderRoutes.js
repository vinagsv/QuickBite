import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getCheckOutSession,
  verifyPaymentAndCreateOrder,
  getUserOrders,
  getOrderDetails,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Get all orders made by the current user
orderRouter.get("/", protect, getUserOrders);

// Get details of a specific order using orderId
orderRouter.get("/:orderId", protect, getOrderDetails);

// Create a new order (must be logged in)
orderRouter.route("/verify-payment").post(protect, verifyPaymentAndCreateOrder);

// Get a Razorpay checkout session
orderRouter.post("/checkout-session", protect, getCheckOutSession);

export { orderRouter };

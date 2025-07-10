import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getCheckOutSession,
  getUserBookings,
  verifyPaymentAndCreateBooking,
  getBookingDetails,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

// get all the bookings made by current user
bookingRouter.get("/", protect, getUserBookings);

// get details of specific booking using bookingId
bookingRouter.get("/:bookingId", protect, getBookingDetails);

// create an new booking (must be logged in)
bookingRouter
  .route("/verify-payment")
  .post(protect, verifyPaymentAndCreateBooking);

// get a razorpay checkout session
bookingRouter.post("/checkout-session", protect, getCheckOutSession);

export { bookingRouter };

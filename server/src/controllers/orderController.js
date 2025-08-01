import Razorpay from "razorpay";
import { Order } from "../models/orderModel.js";
import Restaurant from "../models/restaurantModel.js";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// 1. Create a Razorpay order (before order creation)
const getCheckOutSession = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "Please login first",
      });
    }

    const { amount, currency, restaurantId, items, deliveryAddress } = req.body;

    // Validate restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
      });
    }

    // Validate items
    const invalidItems = items.filter(
      (item) =>
        !restaurant.menu.some(
          (menuItem) =>
            menuItem._id.equals(item.menuItemId) &&
            menuItem.price === item.price &&
            menuItem.name === item.name
        )
    );
    if (invalidItems.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid items in the order",
      });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || "INR",
      receipt: `order_${Date.now()}_${req.user.name}`,
      notes: {
        restaurantId,
        restaurantName: restaurant.name,
        userId: req.user._id.toString(),
        deliveryAddress,
        items: JSON.stringify(items),
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      restaurantName: restaurant.name,
    });
  } catch (error) {
    console.error("Checkout session error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// 2. Verify payment and create the order
const verifyPaymentAndCreateOrder = async (req, res) => {
  try {
    const { razorpayData, orderDetails } = req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorpayData;

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        status: "fail",
        message: "Payment verification failed",
      });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      return res.status(400).json({
        status: "fail",
        message: "Payment not complete",
      });
    }

    const { restaurantId, items, totalAmount, deliveryAddress } = orderDetails;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      totalPrice: totalAmount,
      deliveryAddress,
      paymentStatus: "Paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paidAt: new Date(),
    });

    res.status(200).json({
      status: "success",
      message: "Order created successfully",
      data: {
        order,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      status: "fail",
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// 3. Get all orders for the logged-in user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant", "name image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (error) {
    console.error("Failed to get user orders:", error.message);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// 4. Get details of a specific order
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("restaurant", "name image location")
      .populate("user", "name email phoneNumber");

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    if (!order.user._id.equals(req.user._id)) {
      return res.status(403).json({
        status: "fail",
        message: "Unauthorized to view this order",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    console.error("Failed to get order details:", error.message);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  getCheckOutSession,
  verifyPaymentAndCreateOrder,
  getUserOrders,
  getOrderDetails,
};

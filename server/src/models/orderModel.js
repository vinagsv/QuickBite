import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Order must belong to a restaurant"],
    },
    items: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Menu item ID is required"],
        },
        name: {
          type: String,
          required: [true, "Item name is required"],
        },
        price: {
          type: Number,
          required: [true, "Item price is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Item quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Populate user and restaurant details in queries
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email phoneNumber",
  }).populate({
    path: "restaurant",
    select: "name image location",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);
export { Order };

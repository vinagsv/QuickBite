import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.ObjectId,
      ref: "Property",
      required: [true, "Booking must belong to a property"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Booking must belong to a user"],
    },
    price: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      default: true,
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    guests: {
      type: Number,
    },
    numberOfnights: {
      type: Number,
    },
  },
  { timestamps: true }
);

// query middleware
bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "property",
    select: "maximum location images propertyName address",
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
export { Booking };

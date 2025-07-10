import mongoose from "mongoose";
import slugify from "slugify";

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, "please enter your name"],
  },
  description: {
    type: String,
    required: [true, "please add information about your property"],
  },
  extraInfo: {
    type: String,
    default:
      "Nestled in a tranquil neighborhood, the house exudes an aura of charm and elegance...",
  },
  propertyType: {
    type: String,
    enum: ["House", "Flat", "Guest House", "Hotel"],
    default: "House",
  },
  roomType: {
    type: String,
    enum: ["Anytype", "Room", "Entire house"],
    default: "Anytype",
  },
  maximumGuest: {
    type: Number,
    required: [
      true,
      "please give the maximum number of guests that can occupy",
    ],
  },
  amenities: [
    {
      name: {
        type: String,
        required: true,
        enum: [
          "wifi",
          "kitchen",
          "AC",
          "Washing Machine",
          "Tv",
          "Pool",
          "Free Parking",
        ],
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  images: {
    type: [
      { public_id: { type: String }, url: { type: String, required: true } },
    ],
    validate: {
      validator: function (arr) {
        return arr.length >= 5;
      },
      message: "The images array must contain at least 5 images",
    },
  },
  price: {
    type: Number,
    required: [true, "Please enter the price per night value"],
    default: 500,
  },
  address: {
    area: String,
    city: String,
    state: String,
    pincode: Number,
  },
  currentBookings: [
    {
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
      fromDate: Date,
      toDate: Date,
      userId: {
        type: mongoose.Schema.Types.ObjectId, // ✅ Fixed typo here
        ref: "User",
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  slug: String,
  checkInTime: { type: String, default: "11:00" },
  checkOutTime: { type: String, default: "13:00" },
});

// ✅ Generate slug before save
propertySchema.pre("save", function (next) {
  this.slug = slugify(this.propertyName, { lower: true });
  next();
});

// ✅ Format city before save
propertySchema.pre("save", function (next) {
  if (this.address?.city) {
    this.address.city = this.address.city.toLowerCase().replace(/\s+/g, "");
  }
  next();
});

const Property = mongoose.model("Property", propertySchema);
export { Property }; // ✅ ES Module export

import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  ingredients: {
    type: String,
    enum: ["veg", "nonveg"],
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

const restaurantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  menu: [menuItemSchema],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;

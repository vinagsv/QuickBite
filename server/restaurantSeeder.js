// restaurantSeeder.js run this file to seed new data and delete old data into the database , place json file in ./public/data.json

import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Restaurant from "./src/models/restaurantModel.js";

dotenv.config(); // Load .env file

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Connection error", err);
    process.exit(1);
  });

const importData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync("./public/data.json", "utf-8"));

    await Restaurant.deleteMany(); // Optional: clears old data
    await Restaurant.insertMany(data);

    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("Import Failed", error);
    process.exit(1);
  }
};

importData();

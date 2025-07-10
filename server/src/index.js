import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB.js";
import { router } from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3031;

// Middleware
app.use(
  cors({
    origin: process.env.ORIGIN_ACCESS_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/v1/app/user", router);

// Server
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

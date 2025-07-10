import express from "express";
import { getProperties, getProperty } from "../controllers/propertyController.js"; 


const propertyRouter = express.Router();

propertyRouter.route("/:id").get(getProperty);
propertyRouter.route("/").get(getProperties);


export { propertyRouter }; 

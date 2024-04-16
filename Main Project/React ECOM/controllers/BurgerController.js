import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import BurgerModel from "../models/BurgerModel.js"
import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";


dotenv.config();


export const burgerImageOrder = async (req, res) => {
  try {
    const { order } = req.body;

    // Create a new instance of ImageOrder model
    const newImageOrder = new BurgerModel({
      order,
    });

    // Save the image order data to the database
    await newImageOrder.save();

    res.status(201).json({ message: "Image order saved successfully" });
  } catch (error) {
    console.error("Error saving image order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const fetchBurgerImageOrder = async (req, res) => {
  try {
    // Fetch burger image order data from the database
    const burgerImageOrder = await BurgerModel.find();
    res.status(200).json(burgerImageOrder);
  } catch (error) {
    console.error('Error fetching burger image order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const burgerImageOrder1 = async (req, res) => {
  try {
    const { order, userId } = req.body;

    // Create a new instance of BurgerModel with user ID
    const newBurgerOrder = new BurgerModel({
      order,
      userId,
    });

    // Save the burger image order data to the database
    await newBurgerOrder.save();

    res.status(201).json({ message: "Burger image order saved successfully" });
  } catch (error) {
    console.error("Error saving burger image order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
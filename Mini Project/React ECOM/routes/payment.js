import express  from "express";

import Razorpay from "razorpay";

import crypto from "crypto";

import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";



const router = express.Router()

router.post("/orders", async (req, res) => {
    console.log("B order api 123 ");
    
   
    const { amount, products, buyer } = req.body;
    console.log(" backend have :", amount ,"product:", products,"buyyer :",buyer);
  
    try {
        console.log("B Creating Razorpay instance");
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };
        console.log("B Creating Razorpay order");
        const order1 = await instance.orders.create(options);

        if (!order1) {
            return res.status(500).send("Some error occurred");
        }

        const productIds = products.map(product => product.productId); // Extract productIds from the array

    // Fetch the product documents from the database based on the provided IDs
    const productDocuments = await productModel.find({ _id: { $in: productIds } });

    // Create an array of product objects with only necessary fields
    const productDetails = productDocuments.map(product => ({
      _id: product._id,
      name: product.name, // Replace with the actual field name from your product schema
      // Add other necessary fields
    }));

    // Creating newOrder object
    const newOrder = new orderModel({
      products: productDetails,
      payment: {
        amount: amount, // Assuming you want to store the original amount
        payment:"success",
        currency: options.currency,
        receipt: options.receipt,
      },
      buyer: buyer.userId, // Assuming buyer is already a mongoose ObjectId
      status: "Not Process",
    });

    console.log("New Order Object:", newOrder);

    await newOrder.save();

    
        
        res.json(order1);
        console.log(order1);

    } catch (error) {
        console.error("Error in /orders endpoint:", error);
        res.status(500).send(error.message || "Internal Server Error");
    }
    
});

router.post("/success", async (req, res) => {
    console.log("B success api ");
    try {
        // getting the details back from our front-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
        console.log("create",orderCreationId,"payid",
            razorpayPaymentId,"orderid",
            razorpayOrderId,)
        // Replace the hardcoded secret with your actual secret key
        const secret = process.env.KEY_SECRET;

        // Creating our own digest
        const shasum = crypto.createHmac("sha256", secret);

        //shasum.update($,{orderCreationId}|$,{razorpayPaymentId});
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);


        const digest = shasum.digest("hex");

        // comparing our digest with the actual signature
        if (digest !== razorpaySignature) {
            return res.status(400).json({ msg: "Transaction not legit!" });
        } else {
            console.log("Failed...");
        }

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Internal Server Error");
    }
});

export default router;




import DeliveryModel from "../models/DeliveryModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
//--------------------------------------------------------------register delivery


export const registerDeliveryContoller = async (req, res) => {
  try {
      console.log("Received registration request #########");
      const { name, email, password, phone, address, answer } = req.body
      //validation
      if (!name) {
          return res.send({ error: 'Name is Required' })
      }

      if (!email) {
          return res.send({ message: 'email is Required' })
      }

      if (!password) {
          return res.send({ message: 'Phone is Required' })
      }
      if (!phone) {
          return res.send({ message: 'email is Required' })
      }

      if (!address) {
          return res.send({ message: 'address is Required' })
      }

      if (!answer) {
          return res.send({ error: 'Answer is Required' })
      }


      //check User
      const exsistingUser = await userModel.findOne({ email: email })
      //Exsisting user ?
      if (exsistingUser) {
          return res.status(200).send({
              success: false,
              message: 'Alredy Registerd , please login',
          })
      }
      //register user
      const hashedPassword = await hashPassword(password)
      if (!hashedPassword) {
          return res.status(500).send({
              success: false,
              message: 'Error in hashing password',
          });
      }

      //save
      const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer ,role:"1" }).save()

      res.status(201).send({
          success: true,
          message: 'user Registration Successful',
          user,

      });
  } catch (error) {
      console.error("Error in registration: ########", error);
      console.log(error)
      res.status(500).send({
          success: false,
          messsage: 'Error in Registration',
          error
      })

  }
};

//---------------------------------------------------------- Save order and delivery guy to delivery table

export const chooseOrderForDeliveryController = async (req, res) => {
  const { orderId } = req.params;
 //console.log("Body ==",req.body);
  const { userId } = req.body; 
  
// console.log("Order ID:", orderId);
// console.log("Delivery User ID:", userId);

  try {
    // Check if the order has already been chosen for delivery
    const existingDelivery = await DeliveryModel.findOne({ orderId });
    if (existingDelivery) {
      return res.status(400).send({
        success: false,
        message: "Order has already been chosen for delivery",
      });
    }

    // Save to mongo
    const deliveryOrder = new DeliveryModel({
      userId: userId,
      orderId: orderId,
    });
    await deliveryOrder.save();

    res.status(200).send({
      success: true,
      message: "Order chosen for delivery successfully",
      deliveryOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in choosing order for delivery",
      error: error.message,
    });
  }
};


//--------------------------------------------------------------not in delivery

export const getOrdersNotInDelivery= async (req, res) => {
  try {
    // Find all orders that do not have corresponding records in the delivery table
    const ordersNotInDelivery = await orderModel
    .find({ _id: { $nin: await DeliveryModel.distinct("orderId") } })
    .sort({ createdAt: -1 })
    .populate("payment")
      .populate({
        path: "buyer",
        select: "name phone address", 
      })
      .populate("products"); 
    

    res.status(200).send({
      success: true,
      message: "Orders not in delivery retrieved successfully",
      orders: ordersNotInDelivery
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving orders not in delivery",
      error: error.message
    });
  }
};

//------------------------------------------------------ in delivery

export const getOrdersInDelivery = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a parameter

    // Find orderId values associated with the given userId in the delivery model
    const deliveryOrders = await DeliveryModel.find({ userId: userId });
    const orderIds = deliveryOrders.map(deliveryOrder => deliveryOrder.orderId);

    // Find orders in the orderModel based on the retrieved orderIds
    const ordersInDelivery = await orderModel
      .find({ _id: { $in: orderIds } })
      .populate("payment")
      .sort({ createdAt: -1 })
      .populate({
        path: "buyer",
        select: "name phone address", 
      })
      .populate("products"); 

    res.status(200).send({
      success: true,
      message: "Orders in delivery retrieved successfully",
      orders: ordersInDelivery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving orders in delivery",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------count delivery
export const countUserDeliveries = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Count the number of documents where userId matches
    const count = await DeliveryModel.countDocuments({ userId: userId });

    res.status(200).send({
      success: true,
      message: "Number of deliveries for the user retrieved successfully",
      count: count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving the count of deliveries for the user",
      error: error.message,
    });
  }
};

//----------------------------------------------------------------
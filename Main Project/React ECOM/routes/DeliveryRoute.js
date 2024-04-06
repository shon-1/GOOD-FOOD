import express from "express";
import { isAdmin, isDelivery, requireSignIn } from "./../middlewares/authMiddleware.js";

import { registerDeliveryContoller , chooseOrderForDeliveryController,getOrdersNotInDelivery,getOrdersInDelivery,countUserDeliveries  } from "../controllers/DeliveryController.js";

const router = express.Router();

// Define routes
router.post("/DeliveryAdd/:orderId",
  requireSignIn,
  isAdmin,
  chooseOrderForDeliveryController
);

router.post('/register',  requireSignIn, isAdmin, registerDeliveryContoller );
router.get("/Allorders",  requireSignIn, isDelivery, getOrdersNotInDelivery);
router.get('/Onlyorders/:userId', requireSignIn, isDelivery, getOrdersInDelivery);
router.get('/Count/:userId', requireSignIn, isDelivery, countUserDeliveries );

export default router;

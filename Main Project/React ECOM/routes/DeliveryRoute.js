import express from "express";
import { isAdmin, isDelivery, requireSignIn } from "./../middlewares/authMiddleware.js";

import { registerDeliveryContoller , chooseOrderForDeliveryController,getOrdersNotInDelivery,getOrdersInDelivery,countUserDeliveries  } from "../controllers/DeliveryController.js";

const router = express.Router();

// Define routes
router.post("/DeliveryAdd/:orderId",
 
  chooseOrderForDeliveryController
);

router.post('/register',   registerDeliveryContoller );
router.get("/Allorders",   getOrdersNotInDelivery);
router.get('/Onlyorders/:userId',  getOrdersInDelivery);
router.get('/Count/:userId', countUserDeliveries );

export default router;

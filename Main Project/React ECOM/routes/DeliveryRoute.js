import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

import { chooseOrderForDeliveryController,getOrdersNotInDelivery,getOrdersInDelivery } from "../controllers/DeliveryController.js";

const router = express.Router();

// Define routes
router.post("/DeliveryAdd/:orderId",
  requireSignIn,
  isAdmin,
  chooseOrderForDeliveryController
);

router.get("/Allorders", getOrdersNotInDelivery);
router.get("/Onlyorders", getOrdersInDelivery);

export default router;

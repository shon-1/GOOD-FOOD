import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

import { chooseOrderForDeliveryController } from "../controllers/DeliveryController.js";

const router = express.Router();

// Define routes
router.post("/DeliveryAdd/:orderId",
  requireSignIn,
  isAdmin,
  chooseOrderForDeliveryController
);


export default router;

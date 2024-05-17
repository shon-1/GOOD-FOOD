import express from "express";
import { isAdmin, isDelivery, requireSignIn } from "./../middlewares/authMiddleware.js";

import { registerDeliveryContoller , chooseOrderForDeliveryController,getOrdersNotInDelivery,getOrdersInDelivery,countUserDeliveries, getAllDeliveryGuys, updateDeliveryGuyAddress  } from "../controllers/DeliveryController.js";

const router = express.Router();

// Define routes
router.post("/DeliveryAdd/:orderId",
 
  chooseOrderForDeliveryController
);

router.post('/register',   registerDeliveryContoller );
router.get("/Allorders",   getOrdersNotInDelivery);
router.get('/Onlyorders/:userId',  getOrdersInDelivery);
router.get('/Count/:userId', countUserDeliveries );
router.get('/delivery-guys', getAllDeliveryGuys);
router.put('/:userId/Deli-update-address', updateDeliveryGuyAddress);

export default router;

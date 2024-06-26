import express  from "express";
import { getAllOrdersController, getOrdersController, orderStatusController, registerContoller } from '../controllers/authContoller.js';
import { forgotPasswordController } from "../controllers/authContoller.js";
import { resetPasswordController } from "../controllers/authContoller.js";
import { updateProfileController } from "../controllers/authContoller.js";
import { loginController } from "../controllers/authContoller.js";
import { testController } from "../controllers/authContoller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing
//register || method post
router.post("/register", registerContoller);

//router.post("/api/v1/auth/register", registerContoller);

//LOGIN || POST
router.post('/login',loginController)


//Forgot Password || POST
//router.post("/forgot-password", forgotPasswordController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

// POST route for resetting password
router.post("/reset-password", resetPasswordController);


//test Route
router.get('/test',requireSignIn,isAdmin,testController)
//------------------------------------------------------------------------protected routes
//protected user route
router.get("/user-auth",requireSignIn,(req,res) => {
    res.status(200).send({ok:true});
});

//protected admin Route
router.get("/admin-auth",requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ok:true})
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);


//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
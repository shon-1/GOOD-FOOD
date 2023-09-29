import express  from "express";
import { forgotPasswordController, registerContoller } from '../controllers/authContoller.js';
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
router.post("/forgot-password", forgotPasswordController);


//test Route
router.get('/test',requireSignIn,isAdmin,testController)

//protected route
router.get("/user-auth",requireSignIn,(req,res) => {
    res.status(200).send({ok:true});


});
export default router;
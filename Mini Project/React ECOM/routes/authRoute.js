import express  from "express";
import { registerContoller } from '../controllers/authContoller.js';
import { loginController } from "../controllers/authContoller.js";
import { testController } from "../controllers/authContoller.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing
//register || method post
router.post("/register" , registerContoller)

//LOGIN || POST
router.post('/login',loginController)

//test Route
router.get('/test',requireSignIn,testController)


export default router;
import express  from "express";
import { registerContoller } from '../controllers/authContoller.js';
import { loginController } from "../controllers/authContoller.js";

//router object
const router = express.Router()

//routing
//register || method post
router.post("/register" , registerContoller)

//LOGIN || POST
router.post('/login',loginController)

export default router;
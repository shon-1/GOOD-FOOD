import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

import {burgerImageOrder} from "../controllers/BurgerController.js"

const router = express.Router();

router.post("/burgerImageOrder", burgerImageOrder);

export default router;
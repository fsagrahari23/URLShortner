import express from "express"
import { get_current_user, login, logout, register } from "../controllers/auth.controller.js";
import { authMid } from "../middleware/auth.js";

const router = express.Router();

router.post("/login",login);
router.post("/register",register);
router.get('/logout',authMid, logout);
router.get("/me",authMid,get_current_user)

export default router;
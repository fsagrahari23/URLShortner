import express from "express";
const router = express.Router();
import { createUrl , redirectUrl} from '../controllers/shortUrl.controller.js';
import { authMid } from "../middleware/auth.js";
router.post("/api/create",authMid,createUrl)
router.get("/api/:short_url",authMid,redirectUrl)

export default router;
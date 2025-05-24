import express from 'express'
import {getAllUserUrl} from "../controllers/user.controller.js"
import { authMid } from '../middleware/auth.js';

const router = express.Router();

router.get("/all",authMid,getAllUserUrl)

export default router;
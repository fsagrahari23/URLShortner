import express from "express"
const app = express();
import cors from "cors"
import mongoose from 'mongoose'
import {nanoid} from "nanoid"
import connectDb from "./src/config/mongo.config.js";
import shortURL from "./src/models/shorturl.model.js";
import shortUrlModel from "./src/models/shorturl.model.js";
import shortUrlRouter from "./src/routes/shortUrl.route.js"
import { errorHandler, AppError } from './src/utils/error_handler.js'; 
import authRouter from "./src/routes/auth.route.js"
import userRouter from "./src/routes/user.routes.js"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
  cors({
    origin: "http://localhost:5173", // React app origin
    credentials: true, // 👈 allow cookies
  })
);
app.use(cookieParser());

app.get("/",(req,res)=>{
   res.json({
    msg:"hello world"
   })
})
app.get('/test', (req, res, next) => {
  next(new AppError("Resource not found", 404));
});
app.use("/",shortUrlRouter);
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter)
app.use(errorHandler)



app.listen(5000,()=>{
    connectDb()
    console.log("server is runnning of port 5000")
})
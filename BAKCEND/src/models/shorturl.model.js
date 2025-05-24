import mongoose from "mongoose";

const shortUrl = new mongoose.Schema({
    fullUrl:{
        type:String,
        required:true,
    },
    short_url:{
        type:String,
        required:true,
        index:true,
        unique:true,
    },
    clicks:{
        type:Number,
        required:true,
        default:0,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

const shortUrlModel=mongoose.model("shortUrl",shortUrl);
export default shortUrlModel;
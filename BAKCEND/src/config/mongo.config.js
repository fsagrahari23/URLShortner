import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
     const conn = await mongoose.connect("mongodb+srv://monuagrhari854:mongo@cluster0.8jwl5da.mongodb.net/");
     console.log(`Mongodb Connected:  ${conn.connection.host}`)
    }catch(err){
      console.error(`Error: ${err.message}`);
    }
}

export default connectDb;
import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
     const conn = await mongoose.connect("");
     console.log(`Mongodb Connected:  ${conn.connection.host}`)
    }catch(err){
      console.error(`Error: ${err.message}`);
    }
}

export default connectDb;

import { nanoid } from "nanoid"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET 

export const generateNanoId = (length)=>{
  return nanoid(length)
}

export const generateToken = (user)=>{
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
}


export const verifyToken = (token) => {
  try {

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; 
  }
};
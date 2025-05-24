import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginService, registerService } from '../services/auth.services.js';
import { generateToken } from '../utils/helper.js';
import { findUserByEmail, findUserById } from '../dao/user.dao.js';
 // store in .env

// REGISTER
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

 if (!name || !email || !password) {
  return res.status(400).json({ 
    success: false,
    message: 'Name, email, and password are required.' 
  });
}
    
    const newUser = await registerService(name,email,password);
    // Create JWT
    const token = generateToken(newUser);
 // Set cookie
    res.cookie('token', token, {
      httpOnly: true, // can't be accessed via JS
      secure: true, // true on HTTPS
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      }
    });

  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required.' 
      });
    }

    const user = await loginService(email, password);
    const token = generateToken(user); // generate JWT

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true, // can't be accessed via JS
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (err) {
    next(err);
  }
};

// LOGOUT
export const logout = async (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (err) {
    next(err);
  }
};


export const get_current_user = async(req,res)=>{
  const user = await findUserById(req.user.id);
  res.status(200).json({user:{
    name:user.name,
    email:user.email,
    avatar:user.avatar
  }})
}

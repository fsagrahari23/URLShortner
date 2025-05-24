import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../dao/user.dao.js';

export const registerService = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error('User already exists');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({ name, email, hashedPassword });

  return newUser;
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  return user;
};

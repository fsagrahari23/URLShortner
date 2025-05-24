import User from '../models/user.model.js';

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async ({ name, email, hashedPassword }) => {
  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });
  return await newUser.save();
};

export const findUserById = async (id) => {
  return await User.findById(id).select('-password'); // Exclude password
};

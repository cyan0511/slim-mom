import { User } from "../models/users.js"; // Ensure this is the correct path to your user model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { httpError } from "../helpers/httpError.js"; // Assuming you have an httpError helper

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key"; // Use the secret key from .env

// Register a new user
export const signupUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    throw httpError(400, "Email and password are required");
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw httpError(400, "User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
    verificationToken: null, // Set the default value for verificationToken
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
};

// Log in a user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    throw httpError(400, "Email and password are required");
  }

  // Find the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Invalid email or password");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw httpError(401, "Invalid email or password");
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

  user.token = token;
  await user.save();

  res.status(200).json({
    message: "User logged in successfully",
    token,
  });
};

// Log out a user (invalidate token)
export const logoutUser = async (req, res, next) => {
  const user = req.user; // Assuming you set req.user in the authenticate middleware

  user.token = null;
  await user.save();

  res.status(200).json({ message: "User logged out successfully" });
};

// Delete a user by ID
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw httpError(404, "User not found");
  }

  res.status(200).json({ message: "User deleted successfully" });
};

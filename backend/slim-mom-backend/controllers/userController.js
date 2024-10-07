import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/users.js";
import {
  signupValidation,
  loginValidation,
} from "../validations/validation.js";
import { httpError } from "../helpers/httpError.js";
import { v4 as uuid4 } from "uuid";

// Load environment variables
dotenv.config({ path: "./.env" });
const { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  throw httpError(500, {
    message: "Secret key is missing in environment variables",
  });
}

// Signup endpoint
const signupUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate the signup data
    const { error } = signupValidation.validate(req.body);
    if (error) {
      return next(httpError(400, { message: error.details[0].message }));
    }

    // Check for email conflict
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(httpError(409, { message: "Email already in use" }));
    }

    // Create a verification token
    const verificationToken = uuid4();

    // Create a new user with hashed password
    const newUser = await User.create({
      email,
      password, // The password will be hashed in the pre-save hook
      verificationToken,
    });

    // Send the success response
    res.status(201).json({
      success: true,
      data: {
        user: {
          email: newUser.email,
          verificationToken,
        },
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    next(httpError(500, { message: "Internal Server Error" }));
  }
};

// Login endpoint
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate the login data
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return next(httpError(400, { message: error.details[0].message }));
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        httpError(401, { message: "Email or password is incorrect" })
      );
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(
        httpError(401, { message: "Email or password is incorrect" })
      );
    }

    // Generate a JWT token
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    // Update the user's token in the database
    await User.findByIdAndUpdate(user._id, { token });

    // Send the success response
    res.status(200).json({
      success: true,
      data: {
        token,
        user: { email: user.email },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(httpError(500, { message: "Internal Server Error" }));
  }
};

// Logout endpoint
const logoutUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Update the user's token in the database to null
    await User.findByIdAndUpdate(id, { token: null });

    // Send the success response
    res.status(200).json({ success: true, message: "You have logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    next(httpError(500, { message: "Internal Server Error" }));
  }
};

// Delete user endpoint
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the user exists and delete the user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(httpError(404, { message: "User not found" }));
    }

    // Send success response
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    next(httpError(500, { message: "Internal Server Error" }));
  }
};

export { signupUser, loginUser, logoutUser, deleteUser };

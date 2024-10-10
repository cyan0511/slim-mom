import bcrypt from 'bcrypt';
import {User} from "../models/userModel.js";
import {HttpError} from "../errors/HttpError.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const registerUser = async (req, res, next) => {
    const {name, email, password} = req.body;

    // Registration conflict error
    const user = await User.findOne({email});
    if (user) {
        return next(new HttpError(409, "Email in Use"));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword
    });

    // Registration success response
    res.status(201).json({
        user: {
            name,
            email
        },
    });
};

//login
export const logInUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        // Login auth error (email)
        const user = await User.findOne({email});
        if (!user) {
            return next(new HttpError(401, "Email or password is wrong"));
        }

        // Login auth error (password)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new HttpError(401, "Email or password is wrong"));
        }

        const payload = {id: user._id};
        const accessToken = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

        await User.findByIdAndUpdate(user._id, { accessToken });

        //   Login success response
        res.status(200).json({
            accessToken,
            user: {
                email: user.email,
            },
        });
    } catch (ex) {
        next(new HttpError(500, "Unhandled exception."));
    }
};

//logout

export const logOutUser = async (req, res, next) => {
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return next(new HttpError(400, "No token provided"));
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Find the user based on the decoded token
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new HttpError(404, "User not found"));
        }

        // Invalidate the token by setting the accessToken to null
        user.accessToken = null;
        await user.save();

        // Send success response
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        // Handle invalid token error
        if (error.name === "JsonWebTokenError") {
            return next(new HttpError(401, "Invalid token"));
        }
        next(new HttpError(500, "Server error"));
    }
};
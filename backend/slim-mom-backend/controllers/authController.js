import bcrypt from 'bcrypt';
import {User} from "../models/userModel.js";
import {HttpError} from "../errors/HttpError.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY, REFRESH_TOKEN_SECRET } = process.env;

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
        const accessToken = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "5d" });

        await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

        //   Login success response
        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                email: user.email,
            },
        });
    } catch (ex) {
        next(new HttpError(500, "Unhandled exception."));
    }
};
export const logOutUser = async (req, res, next) => {
    try {
        const { id } = req.user; // Assuming the user ID is extracted from a decoded token in middleware

        // Find the user and clear their tokens
        await User.findByIdAndUpdate(id, { accessToken: null, refreshToken: null });

        // Logout success response
        res.status(200).json({
            message: "Successfully logged out"
        });
    } catch (ex) {
        next(new HttpError(500, "Failed to logout, please try again."));
    }
};


export const refreshToken = async(req, res, next) => {
    try {
        const { refreshToken } = req.body;

        // Ensure there is a refresh token
        if (!refreshToken) {
            return res.status(401).json({ message: "Missing refresh token" });
        }

        // Check if the refresh token exists
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const payload = {id: user._id};

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ message: "Unauthorized (invalid refresh token)" });
            const accessToken = jwt.sign(
                payload,
                SECRET_KEY,
                { expiresIn: "1h" }
            );
            await User.findByIdAndUpdate(user._id, {accessToken});
            res.status(200).json({ accessToken, refreshToken });
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to refresh token" });
    }

}
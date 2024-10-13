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

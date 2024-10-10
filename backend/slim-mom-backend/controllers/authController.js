import bcrypt from 'bcrypt';
import {User} from "../models/userModel.js";
import {HttpError} from "../errors/HttpError.js";

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


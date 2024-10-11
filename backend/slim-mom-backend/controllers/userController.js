import bcrypt from 'bcrypt';
import {User} from "../models/userModel.js";
import {HttpError} from "../errors/HttpError.js";

const users = []; 

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

//Getting the current users Modified by Yassin
const getCurrentUser = async (req, res) => {
    // Simulating user ID (you would normally get this from the request session or token)
    const userId = req.query.userId || '1'; // For simulation purposes

    try {
        const user = await User.findById(userId);
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export {getCurrentUser}
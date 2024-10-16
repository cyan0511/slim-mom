import jwt from 'jsonwebtoken';
import {User} from "../models/userModel.js";
import {HttpError} from "../errors/HttpError.js";

const { SECRET_KEY } = process.env;

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new HttpError(401, "No token provided"));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return next(new HttpError(404, "User not found"));
        }

        // Attach user to the request
        req.user = user;
        next();
    } catch (err) {
        next(new HttpError(403, "Token verification failed"));
    }
};
import {HttpError} from "../errors/HttpError.js";
import {getCategories} from "./productController.js";

export const calculateDailyIntake = async (req, res, next) => {
    try {
        const { height, currentWeight: weight, age, desiredWeight, bloodType } = req.body;

        const dailyCalorieIntake = 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
        const categories = await getCategories(bloodType);

        res.status(200).json({
            dailyCalorieIntake,
            foodNotRecommended: categories,
        });

    } catch (ex) {
        next(new HttpError(500, 'error calculating daily intake.'));
    }
};


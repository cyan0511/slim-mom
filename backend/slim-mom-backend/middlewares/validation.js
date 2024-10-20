// Validation middleware
import {
    dailyCaloriesValidation,
    registerValidation, logInValidation, diaryValidation
} from "../validations/validation.js";

const validate = joiSchema => (req, res, next) => {
    const {error} = joiSchema.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(400).json({
            status: 'error',
            errors: error.details.map(detail => ({
                field: detail.context?.key,
                message: detail.message
            }))
        });
    }
    next();
};

export const validateRegistration = validate(registerValidation);
export const validateLogIn = validate(logInValidation);
export const validateDailyCaloriesIntake = validate(dailyCaloriesValidation);
export const validateDiary = validate(diaryValidation);
// export const validateCurrentUser = validate()
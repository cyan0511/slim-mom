import Joi from 'joi';

// validation for registration
export const registerValidation = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "any.required": "Missing required name field"
        }),
    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}})
        .required()
        .messages({
            "any.required": "Missing required email field",
            "string.email": "Invalid email format",
        }),
    password: Joi.string().min(6).max(16).required().messages({
        "any.required": "Missing required password field",
        "string.min": "Password must be at least {#limit} characters long",
        "string.max": "Password cannot be longer than {#limit} characters",
    }),
});

export const logInValidation = Joi.object({
    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}})
        .required()
        .messages({
            "any.required": "Missing required email field",
            "string.email": "Invalid email format",
        }),
    password: Joi.string().min(6).max(16).required().messages({
        "any.required": "Missing required password field",
        "string.min": "Password must be at least {#limit} characters long",
        "string.max": "Password cannot be longer than {#limit} characters",
    }),
});

export const dailyCaloriesValidation = Joi.object({
    height: Joi.number()
        .required()
        .messages({
            "any.required": "Missing required height field"
        }),
    age: Joi.number()
        .required()
        .messages({
            "any.required": "Missing required age field",
        }),
    currentWeight: Joi.number()
        .required()
        .messages({
            "any.required": "Missing required currentWeight field",
        }),
    desiredWeight: Joi.number()
        .required()
        .messages({
            "any.required": "Missing required desiredWeight field",
        }),
    bloodType: Joi.number()
        .min(1)
        .max(4)
        .required()
        .messages({
            "any.required": "Missing required bloodType field",
            'number.base': 'Value must be a number',
            'number.min': 'Number must be at least {#limit}',
            'number.max': 'Number must be at most {#limit}',
            'number.integer': 'Number must be an integer',
            'number.positive': 'Number must be positive',
        }),
});

export const diaryValidation = Joi.object({
    date: Joi.date().required()
        .messages({
            "any.required": "Missing required date field"
        }),
    grams: Joi.number().required().messages({
        "any.required": "Missing required grams field"
    }),
    productId: Joi.string().required().messages({
        "any.required": "Missing required productId field"
    })
});
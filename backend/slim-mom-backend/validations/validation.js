import Joi from 'joi';

// validation for registration
export const registerValidation = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "any.required": "Missing required name field"
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
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
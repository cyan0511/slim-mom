import Joi from "joi";

// Validation for signup
const signupValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "any.required": "Missing required email field",
      "string.email": "Invalid email format",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,16}$"
      )
    )
    .required()
    .messages({
      "string.empty": "Password cannot be empty",
      "any.required": "Missing required password field",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "string.min": "Password must be at least {#limit} characters long",
      "string.max": "Password cannot be longer than {#limit} characters",
    }),
});

// Validation for login
const loginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "any.required": "Missing required email field",
      "string.email": "Invalid email format",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Missing required password field",
  }),
});

// Handle Joi validation errors on the server-side
const handleSignupValidation = (req, res, next) => {
  const { error } = signupValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Handle Joi validation errors for login on the server-side
const handleLoginValidation = (req, res, next) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Export the validation and error handling functions
export {
  signupValidation,
  handleSignupValidation,
  loginValidation,
  handleLoginValidation,
};

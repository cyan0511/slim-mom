import { body, validationResult } from "express-validator";

// Validation for signup
export const validateSignup = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(), // Sanitize email input
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character.")
    .trim(), // Sanitize password by trimming whitespace
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation for login
export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(), // Sanitize email input
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .trim(), // Sanitize password by trimming whitespace
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

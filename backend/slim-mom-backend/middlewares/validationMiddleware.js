// middlewares/validationMiddleware.js

import { body, validationResult } from "express-validator";

// Validation for signup
export const validateSignup = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
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
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password").notEmpty().withMessage("Password is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

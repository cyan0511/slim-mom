import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import {
  signupUser,
  loginUser,
  logoutUser,
  deleteUser,
} from "../../controllers/userController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import {
  validateSignup,
  validateLogin,
} from "../../middlewares/validationMiddleware.js";
import { httpError } from "../../helpers/httpError.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User registration
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/signup",
  validateSignup,
  ctrlWrapper(async (req, res) => {
    await signupUser(req);
    res.status(201).json({ message: "User registered successfully" });
  })
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Log in an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Authentication failed
 */
router.post(
  "/login",
  validateLogin,
  ctrlWrapper(async (req, res) => {
    const userData = await loginUser(req);

    if (!userData || !userData.token) {
      throw httpError(401, "Authentication failed. No token generated.");
    }

    res.status(200).json({
      message: "User logged in successfully",
      token: userData.token,
    });
  })
);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: User logout
 *     description: Log out a user (requires authentication).
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.get(
  "/logout",
  authenticateToken,
  ctrlWrapper(async (req, res) => {
    await logoutUser(req);
    res.status(200).json({ message: "User logged out successfully" });
  })
);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID (requires authentication).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid user ID
 */
router.delete(
  "/delete/:id",
  authenticateToken,
  ctrlWrapper(async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      throw httpError(400, "Invalid user ID");
    }

    await deleteUser(req);
    res.status(200).json({ message: "User deleted successfully" });
  })
);

export default router;

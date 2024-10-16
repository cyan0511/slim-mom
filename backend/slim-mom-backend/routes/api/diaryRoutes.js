import express from "express";
import {
    addDiary,
    deleteDiary,
    listDiaries
} from "../../controllers/diaryController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import {validateDiary} from "../../middlewares/validation.js";

const router = express.Router();

/**
 * @swagger
 * /api/diaries:
 *   get:
 *     summary: list diaries
 *     tags: [Diary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: The date filter
 *     responses:
 *       200:
 *         description: List of diary by date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   title:
 *                     type: string
 *                   grams:
 *                     type: number
 *                   calories:
 *                     type: number
 *                   calorieIntake:
 *                     type: number
 *                   category:
 *                     type: string
 *       400:
 *         description: Invalid or missing date
 *       401:
 *         description: Unauthorized
 */

router.get("/", authenticateToken, listDiaries);

/**
 * @swagger
 * /api/diaries:
 *   post:
 *     summary: Add a new diary.
 *     tags: [Diary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-12"
 *               title:
 *                 type: string
 *                 example: "Banana"
 *               grams:
 *                 type: number
 *                 example: 150
 *                 description: The amount of the product consumed in grams
 *               calories:
 *                 type: number
 *               calorieIntake:
 *                 type: number
 *             required:
 *               - date
 *               - title
 *               - grams
 *               - calories
 *               - calorieIntake
 *               - category
 *     responses:
 *       201:
 *         description: Diary added successfully
 *       400:
 *         description: Invalid parameters
 */

router.post("/", authenticateToken, validateDiary, addDiary);

/**
 * @swagger
 * /api/diaries/{id}:
 *   delete:
 *     summary: Delete a diary by id.
 *     tags: [Diary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The diary id
 *     responses:
 *       200:
 *         description: Diary deleted successfully
 *       404:
 *         description: Diary not found
 */

router.delete("/:id", authenticateToken, deleteDiary);

export default router;
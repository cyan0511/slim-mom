import express from "express";
import {
    addDiary,
    deleteDiary,
    listDiaries
} from "../../controllers/diaryController.js";
import {verifyToken} from "../../middlewares/authenticateToken.js";

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

router.get("/", verifyToken, listDiaries);

/**
 * @swagger
 * /api/diaries/add:
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
 *               title:
 *                 type: string
 *               grams:
 *                 type: number
 *               calories:
 *                 type: number
 *               calorieIntake:
 *                 type: number
 *               category:
 *                 type: string
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

router.post("/add", verifyToken, addDiary);

/**
 * @swagger
 * /api/diaries/delete/{id}:
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

router.delete("/delete/:id", verifyToken, deleteDiary);

export default router;
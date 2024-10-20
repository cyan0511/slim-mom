import express from 'express'
import { validateDailyCaloriesIntake } from '../../middlewares/validation.js'
import { calculateDailyIntake, getCurrentUser } from '../../controllers/userController.js'
import { authenticateToken } from '../../middlewares/authenticateToken.js'

const router = express.Router()

/**
 * @swagger
 * /users/daily-calorie-intake:
 *   post:
 *     summary: Calculate Daily Calorie Intake
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - age
 *               - currentWeight
 *               - desiredWeight
 *               - bloodType
 *             properties:
 *               height:
 *                 type: number
 *                 description: The user's height
 *               age:
 *                 type: number
 *                 description: The user's age
 *               currentWeight:
 *                 type: number
 *                 description: The user's current weight
 *               desiredWeight:
 *                 type: number
 *                 description: The user's desired weight
 *               bloodType:
 *                 type: number
 *                 description: The user's bloodType
 *     responses:
 *       200:
 *         description: daily calorie intake with  not recommended food
 *       400:
 *         description: Invalid input
 */
router.post('/daily-calorie-intake', validateDailyCaloriesIntake, calculateDailyIntake)


/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Get current user
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user retrieved successfully
 *       401:
 *         description: Unauthorized
 */

router.get('/current', authenticateToken, getCurrentUser)

export default router

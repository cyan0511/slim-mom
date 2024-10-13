import express from "express";
import { validateRegistration } from "../../middlewares/validation.js";
import {
  listCategories,
  listProducts,
  addConsumedProduct,
} from "../../controllers/productController.js";

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Search product
 *     tags: [Products]
 *     parameters:
 *     - in: query
 *       name: categories
 *       schema:
 *         type: string
 *       description: The category of the products to filter by
 *     - in: query
 *       name: weight
 *       schema:
 *         type: number
 *       description: The weight of the products to filter by
 *     - in: query
 *       name: title
 *       schema:
 *         type: string
 *       description: The title of the products to filter by
 *     - in: query
 *       name: calories
 *       schema:
 *         type: number
 *       description: The calories of the products to filter by
 *     - in: query
 *       name: bloodType
 *       schema:
 *         type: number
 *       description: The blood type group of the products to filter by
 *     responses:
 *       200:
 *         description: Product List
 *       400:
 *         description: Invalid input
 */
router.get("/", listProducts);

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: List categories
 *     tags: [Products]
 *     parameters:
 *     - in: query
 *       name: bloodType
 *       schema:
 *         type: number
 *       description: The blood type group of the categories to filter by
 *     responses:
 *       200:
 *         description: Category List
 *       400:
 *         description: Invalid input
 */
router.get("/categories", listCategories);

/**
 * @swagger
 * /products/consume:
 *   post:
 *     summary: Add a consumed product to a specific day
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Banana"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-12"
 *               grams:
 *                 type: number
 *                 example: 150
 *                 description: The amount of the product consumed in grams
 *     responses:
 *       201:
 *         description: Product consumed successfully
 *       400:
 *         description: Request body required
 *       500:
 *         description: Error adding consumed product
 */
router.post("/consume", addConsumedProduct);

export default router;

import express from "express";
import { validateRegistration } from "../../middlewares/validation.js";
import {
  listCategories,
  listProducts,
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

export default router;

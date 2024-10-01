import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Returns an example message
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get('/', (req, res) => {
    res.send('This is an example route!');
});

export default router;

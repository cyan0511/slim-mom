import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js';
import authRoutes from "./routes/api/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define a route
/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Returns an example message
 *     responses:
 *       200:
 *         description: A successful response
 */
// Use the example routes
app.use('/api/user', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

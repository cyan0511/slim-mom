import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js';
import authRoutes from "./routes/api/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 8081;

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/user', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

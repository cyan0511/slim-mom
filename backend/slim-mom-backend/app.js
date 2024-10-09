import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js';
import authRoutes from "./routes/api/userRoutes.js";
import { validateRegistration } from "./middlewares/validateRegistration.js"
import { verifyToken } from './middlewares/authenticateToken.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/user', authRoutes);

app.post('/register', verifyToken, validateRegistration, (req, res) => {
    // Your registration logic here
    res.status(201).json({ message: 'User registered successfully' });
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

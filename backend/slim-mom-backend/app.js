import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js';
import authRoutes from './routes/api/authRoutes.js';
import userRoutes from './routes/api/userRoutes.js';
import productRoutes from './routes/api/productRoutes.js';
import diaryRoutes from './routes/api/diaryRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 8080;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
// Allow all origins
app.use(
    cors({
      origin: '*', // Allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // Allow credentials like cookies, if needed
    }),
);
app.use(express.json());

//public distribution
app.use(express.static('public'));

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/diaries', diaryRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error-handling middleware
app.use(errorHandler);

export default app;

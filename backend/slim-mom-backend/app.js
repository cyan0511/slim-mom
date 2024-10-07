// Import necessary modules
import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/api/auth.js"; // Import your user routes
import morgan from "morgan"; // Logging middleware
import cors from "cors"; // CORS middleware
import errorHandler from "./middlewares/errorHandler.js"; // Custom error handler

// Initialize the Express app
const app = express();

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // OpenAPI version 3.0.0
    info: {
      title: "API Documentation",
      description: "API documentation with Swagger",
      contact: {
        name: "Developer",
      },
      version: "1.0.0", // Version of the API
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000", // Server URL
        description: "Development server", // Server description
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Path to your API route definitions for Swagger annotations
};

// Initialize Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging middleware
app.use(express.json()); // For parsing JSON request bodies

// Serve Swagger UI at `/api-docs`
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register your routes
app.use("/api/user", userRoutes);

// Error handling middleware
app.use(errorHandler); // Ensure to define this middleware to handle errors

// Set the port and start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
export default app;

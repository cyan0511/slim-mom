// Import necessary modules
import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan"; // Logging middleware
import cors from "cors"; // CORS middleware
import helmet from "helmet"; // Security middleware
import dotenv from "dotenv"; // Environment variables
import userRoutes from "./routes/api/auth.js"; // Import your user routes
import errorHandler from "./middlewares/errorHandler.js"; // Custom error handler

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

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
        url: process.env.BASE_URL || "http://localhost:5002", // Server URL
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
app.use(helmet()); // Secure the app by setting various HTTP headers
app.use(morgan("combined")); // Logging middleware
app.use(express.json()); // For parsing JSON request bodies

// Serve Swagger UI at `/api-docs`
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register your routes
app.use("/api/user", userRoutes);

// Error handling middleware
app.use(errorHandler); // Ensure to define this middleware to handle errors

// Validate essential environment variables
const requiredEnvVars = ["PORT", "BASE_URL"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Error: Missing environment variable ${varName}`);
    process.exit(1); // Exit the application with failure code
  }
});

// Set the port and start the server
const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

// Graceful shutdown
const shutdown = () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Server shut down gracefully.");
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export default app;

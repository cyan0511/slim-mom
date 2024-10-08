<<<<<<< Updated upstream
=======
// swagger.js
>>>>>>> Stashed changes
import swaggerJsDoc from "swagger-jsdoc";

// Get the port from environment variables or default to 5001
const PORT = process.env.PORT || 5002;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
<<<<<<< Updated upstream
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "My API", // Title of the API
      version: "1.0.0", // API version
      description: "API documentation for my application", // Short description of the API
    },
    servers: [
      {
        url: SERVER_URL, // Base URL for the API
      },
    ],
  },
  apis: ["./routes/api/*.js"], // Path to your API route definitions for Swagger annotations
=======
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my application",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // Change this to your server URL
      },
    ],
  },
  apis: ["./routes/api/*.js"], // Path to the API docs (JSDoc comments)
>>>>>>> Stashed changes
};

// Initialize Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Export the generated Swagger documentation
export default swaggerDocs;

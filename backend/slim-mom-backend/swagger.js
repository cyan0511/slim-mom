import swaggerJsDoc from "swagger-jsdoc";

// Get the port from environment variables or default to 8080
const PORT = process.env.PORT || 8080;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
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
};

// Initialize Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Export the generated Swagger documentation
export default swaggerDocs;

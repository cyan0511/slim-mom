// swagger.js
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from "dotenv";

dotenv.config();

const { HOST, PORT = 8080 } = process.env;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Slim-Mom API',
            version: '1.0.0',
            description: 'API documentation for Slim-Mom application',
        },
        servers: [
            {
                url: `${HOST}${PORT === 80 ? '' : `:${PORT}`}/api`, // Change this to your server URL
            },
        ],
    },
    apis: ['./routes/api/*.js'], // Path to the API docs (JSDoc comments)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;

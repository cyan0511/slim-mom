// swagger.js
import swaggerJsDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 8081;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation for my project',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, // Change this to your server URL
            },
        ],
    },
    apis: ['./routes/api/*.js'], // Path to the API docs (JSDoc comments)
    };

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;

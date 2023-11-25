const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Salaam',
            version: '1.0.0',
            description: 'A way to send blessings',
        },
        servers: [
            {
                url: 'http://localhost:9090',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/**/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;

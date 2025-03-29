const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Import components
const InMemoryUserRepository = require('./infrastructure/persistence/inMemoryUserRepository');
const UserService = require('./application/services/userService');
const UserController = require('./interfaces/http/userController');

// Initialize Express app
const app = express();
const port = 3008; // Using port 3008 for DDD architecture

// Configure logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DDD Architecture API',
            version: '1.0.0',
            description: 'API documentation for Domain-Driven Design Architecture Pattern'
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/interfaces/http/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize components
const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Routes
app.use('/api/users', userController.getRouter());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DDD Architecture API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    logger.info(`DDD Architecture server running on port ${port}`);
}); 
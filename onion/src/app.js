const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Domain and Infrastructure
const UserRepository = require('./infrastructure/repositories/userRepository');
const UserService = require('./domain/services/userService');
const UserController = require('./application/controllers/userController');

// Initialize express app
const app = express();
const port = process.env.PORT || 3003;
console.log('Initializing Onion Architecture application...');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'onion-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'onion-combined.log' })
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
      title: 'Onion Architecture API',
      version: '1.0.0',
      description: 'API documentation for Onion Architecture pattern implementation',
    },
    servers: [
      {
        url: 'http://localhost:3003',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger documentation available at /api-docs');

// Logging middleware
app.use((req, res, next) => {
  logger.info(`Onion: ${req.method} ${req.url}`);
  next();
});

// Initialize dependencies
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Routes
app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.json({ message: 'Welcome to Onion Architecture API' });
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get('/api/users', userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
app.get('/api/users/:id', userController.getUser.bind(userController));

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 */
app.post('/api/users', userController.createUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
app.put('/api/users/:id', userController.updateUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
app.delete('/api/users/:id', userController.deleteUser.bind(userController));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Onion Error: Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Onion server is running on port ${port}`);
  logger.info(`Onion server started on port ${port}`);
});

module.exports = app; 
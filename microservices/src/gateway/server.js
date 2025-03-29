const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Initialize express app
const app = express();
const port = process.env.PORT || 3001;
console.log('Initializing API Gateway...');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'gateway-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'gateway-combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Service URLs
const USER_SERVICE_URL = 'http://localhost:3002';

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
      title: 'Microservices Architecture API',
      version: '1.0.0',
      description: 'API documentation for Microservices Architecture pattern implementation',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/gateway/server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger documentation available at /api-docs');

// Logging middleware
app.use((req, res, next) => {
  logger.info(`Gateway: ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.json({ message: 'Welcome to Microservices Architecture API' });
});

// Forward all user-related requests to the User Service
app.get('/api/users', async (req, res) => {
  try {
    logger.info('Forwarding GET /api/users request to User Service');
    const response = await axios.get(`${USER_SERVICE_URL}/api/users`);
    res.json(response.data);
  } catch (error) {
    logger.error('Error forwarding GET /api/users request:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    logger.info(`Forwarding GET /api/users/${req.params.id} request to User Service`);
    const response = await axios.get(`${USER_SERVICE_URL}/api/users/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    logger.error(`Error forwarding GET /api/users/${req.params.id} request:`, error);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Error fetching user' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    logger.info('Forwarding POST /api/users request to User Service');
    const response = await axios.post(`${USER_SERVICE_URL}/api/users`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    logger.error('Error forwarding POST /api/users request:', error);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Error creating user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    logger.info(`Forwarding PUT /api/users/${req.params.id} request to User Service`);
    const response = await axios.put(`${USER_SERVICE_URL}/api/users/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    logger.error(`Error forwarding PUT /api/users/${req.params.id} request:`, error);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Error updating user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    logger.info(`Forwarding DELETE /api/users/${req.params.id} request to User Service`);
    const response = await axios.delete(`${USER_SERVICE_URL}/api/users/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    logger.error(`Error forwarding DELETE /api/users/${req.params.id} request:`, error);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Error deleting user' });
  }
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
 *           type: integer
 */

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
 *           type: integer
 */

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
 *           type: integer
 */

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Gateway Error: Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
  logger.info(`API Gateway started on port ${port}`);
}); 
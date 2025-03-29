const express = require('express');
const router = express.Router();
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'user-service-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'user-service-combined.log' })
  ]
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users from the user service
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', (req, res) => {
  logger.info('User Service: Fetching all users');
  console.log('GET /users - Fetching all users');
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  logger.info(`User Service: Fetching user with ID: ${userId}`);
  console.log(`GET /users/${userId} - Fetching user details`);
  
  // Simulate user lookup
  const user = { id: parseInt(userId), name: 'John Doe', email: 'john@example.com' };
  res.json(user);
});

/**
 * @swagger
 * /users:
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
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/', (req, res) => {
  const { name, email } = req.body;
  logger.info(`User Service: Creating new user: ${name}`);
  console.log('POST /users - Creating new user:', { name, email });
  
  // Simulate user creation
  const newUser = { id: 3, name, email };
  res.status(201).json(newUser);
});

module.exports = router; 
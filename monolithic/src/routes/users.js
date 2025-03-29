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
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// In-memory storage for users
const users = new Map();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
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
  logger.info('Fetching all users');
  console.log('GET /api/users - Fetching all users');
  const userList = Array.from(users.values());
  res.json(userList);
});

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
  logger.info(`Fetching user with ID: ${userId}`);
  console.log(`GET /api/users/${userId} - Fetching user details`);
  
  const user = users.get(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

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
 *             required:
 *               - name
 *               - email
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
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  logger.info(`Creating new user: ${name}`);
  console.log('POST /api/users - Creating new user:', { name, email });
  
  const id = Date.now().toString();
  const user = { id, name, email, createdAt: new Date(), updatedAt: new Date() };
  users.set(id, user);
  res.status(201).json(user);
});

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
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  logger.info(`Updating user with ID: ${userId}`);
  console.log(`PUT /api/users/${userId} - Updating user:`, { name, email });

  if (!users.has(userId)) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = users.get(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  user.name = name;
  user.email = email;
  user.updatedAt = new Date();
  users.set(userId, user);
  res.json(user);
});

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
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  logger.info(`Deleting user with ID: ${userId}`);
  console.log(`DELETE /api/users/${userId} - Deleting user`);

  if (!users.has(userId)) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.delete(userId);
  res.json({ message: 'User deleted successfully' });
});

module.exports = router; 
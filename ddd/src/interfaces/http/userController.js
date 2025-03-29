const express = require('express');
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

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

class UserController {
    constructor(userService) {
        this.userService = userService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
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
         *       400:
         *         description: Invalid input
         */
        this.router.post('/', async (req, res) => {
            try {
                const user = await this.userService.createUser(req.body.name, req.body.email);
                res.status(201).json(user);
            } catch (error) {
                logger.error('Error in create user endpoint', { error: error.message });
                res.status(400).json({ error: error.message });
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
        this.router.get('/', async (req, res) => {
            try {
                const users = await this.userService.getAllUsers();
                res.json(users);
            } catch (error) {
                logger.error('Error in get all users endpoint', { error: error.message });
                res.status(500).json({ error: error.message });
            }
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   get:
         *     summary: Get a user by ID
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User details
         *       404:
         *         description: User not found
         */
        this.router.get('/:id', async (req, res) => {
            try {
                const user = await this.userService.getUser(req.params.id);
                res.json(user);
            } catch (error) {
                logger.error('Error in get user endpoint', { error: error.message });
                res.status(404).json({ error: error.message });
            }
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   put:
         *     summary: Update a user
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
        this.router.put('/:id', async (req, res) => {
            try {
                const user = await this.userService.updateUser(
                    req.params.id,
                    req.body.name,
                    req.body.email
                );
                res.json(user);
            } catch (error) {
                logger.error('Error in update user endpoint', { error: error.message });
                res.status(404).json({ error: error.message });
            }
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   delete:
         *     summary: Delete a user
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
        this.router.delete('/:id', async (req, res) => {
            try {
                await this.userService.deleteUser(req.params.id);
                res.json({ message: 'User deleted successfully' });
            } catch (error) {
                logger.error('Error in delete user endpoint', { error: error.message });
                res.status(404).json({ error: error.message });
            }
        });

        /**
         * @swagger
         * /api/users/{id}/history:
         *   get:
         *     summary: Get user event history
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User event history
         */
        this.router.get('/:id/history', async (req, res) => {
            try {
                const history = await this.userService.getUserHistory(req.params.id);
                res.json(history);
            } catch (error) {
                logger.error('Error in get user history endpoint', { error: error.message });
                res.status(500).json({ error: error.message });
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = UserController; 
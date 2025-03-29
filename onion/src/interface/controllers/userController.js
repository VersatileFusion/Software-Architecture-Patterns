const express = require('express');
const router = express.Router();

class UserController {
    constructor(userApplicationService) {
        this.userApplicationService = userApplicationService;
        this.router = router;
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @swagger
         * /api/users:
         *   post:
         *     summary: Create a new user
         *     tags: [Users]
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
                const { name, email } = req.body;
                const user = await this.userApplicationService.createUser(name, email);
                res.status(201).json(user);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   get:
         *     summary: Get a user by ID
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User found
         *       404:
         *         description: User not found
         */
        this.router.get('/:id', async (req, res) => {
            try {
                const user = await this.userApplicationService.getUser(req.params.id);
                res.json(user);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        });

        /**
         * @swagger
         * /api/users:
         *   get:
         *     summary: Get all users
         *     tags: [Users]
         *     responses:
         *       200:
         *         description: List of users
         */
        this.router.get('/', async (req, res) => {
            try {
                const users = await this.userApplicationService.getAllUsers();
                res.json(users);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   put:
         *     summary: Update a user
         *     tags: [Users]
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
                const { name, email } = req.body;
                const user = await this.userApplicationService.updateUser(req.params.id, name, email);
                res.json(user);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   delete:
         *     summary: Delete a user
         *     tags: [Users]
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
                await this.userApplicationService.deleteUser(req.params.id);
                res.json({ message: 'User deleted successfully' });
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = UserController; 
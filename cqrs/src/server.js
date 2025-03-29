const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Import components
const UserRepository = require('./repositories/userRepository');
const CreateUserCommand = require('./commands/createUser');
const UpdateUserCommand = require('./commands/updateUser');
const DeleteUserCommand = require('./commands/deleteUser');
const GetUserQuery = require('./queries/getUser');
const GetAllUsersQuery = require('./queries/getAllUsers');

// Initialize Express app
const app = express();
const port = 3006; // Using port 3006 for CQRS architecture

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
            title: 'CQRS Architecture API',
            version: '1.0.0',
            description: 'API documentation for CQRS Architecture Pattern'
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize components
const userRepository = new UserRepository();
const createUserCommand = new CreateUserCommand(userRepository);
const updateUserCommand = new UpdateUserCommand(userRepository);
const deleteUserCommand = new DeleteUserCommand(userRepository);
const getUserQuery = new GetUserQuery(userRepository);
const getAllUsersQuery = new GetAllUsersQuery(userRepository);

// Routes
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
app.post('/api/users', async (req, res) => {
    try {
        const user = await createUserCommand.execute(req.body);
        res.status(201).json(user);
    } catch (error) {
        logger.error('Error creating user', { error: error.message });
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
app.get('/api/users', async (req, res) => {
    try {
        const users = await getAllUsersQuery.execute();
        res.json(users);
    } catch (error) {
        logger.error('Error fetching users', { error: error.message });
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
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await getUserQuery.execute(req.params.id);
        res.json(user);
    } catch (error) {
        logger.error('Error fetching user', { error: error.message });
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
app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await updateUserCommand.execute(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        logger.error('Error updating user', { error: error.message });
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
app.delete('/api/users/:id', async (req, res) => {
    try {
        await deleteUserCommand.execute(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error('Error deleting user', { error: error.message });
        res.status(404).json({ error: error.message });
    }
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to CQRS Architecture API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    logger.info(`CQRS Architecture server running on port ${port}`);
}); 
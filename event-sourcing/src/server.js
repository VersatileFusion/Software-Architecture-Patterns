const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Import components
const InMemoryEventStore = require('./eventStore/inMemoryEventStore');
const UserProjection = require('./projections/userProjection');
const UserCreated = require('./events/userCreated');
const UserUpdated = require('./events/userUpdated');
const UserDeleted = require('./events/userDeleted');
const User = require('./models/user');

// Initialize Express app
const app = express();
const port = 3007; // Using port 3007 for Event Sourcing architecture

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
            title: 'Event Sourcing Architecture API',
            version: '1.0.0',
            description: 'API documentation for Event Sourcing Architecture Pattern'
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
const eventStore = new InMemoryEventStore();
const userProjection = new UserProjection(eventStore);

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
        const user = new User(Date.now().toString(), req.body.name, req.body.email);
        user.validate();

        const event = new UserCreated(user.id, user.name, user.email);
        await eventStore.save(event);
        await userProjection.apply(event);

        res.status(201).json(user.toJSON());
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
        const users = await userProjection.getAllUsers();
        res.json(users.map(user => user.toJSON()));
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
        const user = await userProjection.getUser(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user.toJSON());
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
        const user = await userProjection.getUser(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const event = new UserUpdated(user.id, req.body.name, req.body.email);
        await eventStore.save(event);
        await userProjection.apply(event);

        const updatedUser = await userProjection.getUser(user.id);
        res.json(updatedUser.toJSON());
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
        const user = await userProjection.getUser(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const event = new UserDeleted(user.id);
        await eventStore.save(event);
        await userProjection.apply(event);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error('Error deleting user', { error: error.message });
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
app.get('/api/users/:id/history', async (req, res) => {
    try {
        const history = await userProjection.getUserHistory(req.params.id);
        res.json(history);
    } catch (error) {
        logger.error('Error fetching user history', { error: error.message });
        res.status(500).json({ error: error.message });
    }
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Event Sourcing Architecture API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    logger.info(`Event Sourcing Architecture server running on port ${port}`);
}); 
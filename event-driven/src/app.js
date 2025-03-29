const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Import components
const eventManager = require('./events/eventManager');
const userEventHandlers = require('./events/handlers/userEventHandlers');
const UserService = require('./services/userService');
const UserController = require('./controllers/userController');

// Initialize express app
const app = express();
const port = process.env.PORT || 3005;
console.log('Initializing Event-Driven Architecture application...');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'event-driven-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'event-driven-combined.log' })
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
      title: 'Event-Driven Architecture API',
      version: '1.0.0',
      description: 'API documentation for Event-Driven Architecture pattern implementation',
    },
    servers: [
      {
        url: 'http://localhost:3005',
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
  logger.info(`Event-Driven: ${req.method} ${req.url}`);
  next();
});

// Initialize dependencies
const userService = new UserService();
const userController = new UserController(userService);

// Subscribe to events with proper binding
const events = eventManager.getEvents().USER;
eventManager.subscribe(events.CREATED, (user) => userEventHandlers.onUserCreated(user));
eventManager.subscribe(events.UPDATED, (user) => userEventHandlers.onUserUpdated(user));
eventManager.subscribe(events.DELETED, (user) => userEventHandlers.onUserDeleted(user));
eventManager.subscribe(events.FETCHED, (user) => userEventHandlers.onUserFetched(user));
eventManager.subscribe(events.FETCH_ALL, (users) => userEventHandlers.onUsersFetchAll(users));

// Routes
app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.json({ message: 'Welcome to Event-Driven Architecture API' });
});

// User routes with proper method binding
const routes = express.Router();

routes.get('/users', (req, res) => userController.getAllUsers(req, res));
routes.get('/users/:id', (req, res) => userController.getUser(req, res));
routes.post('/users', (req, res) => userController.createUser(req, res));
routes.put('/users/:id', (req, res) => userController.updateUser(req, res));
routes.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Event-Driven Error: Something went wrong!' });
});

// Process-level error handling
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start server
app.listen(port, () => {
  console.log(`Event-Driven server is running on port ${port}`);
  logger.info(`Event-Driven server started on port ${port}`);
});

module.exports = app; 
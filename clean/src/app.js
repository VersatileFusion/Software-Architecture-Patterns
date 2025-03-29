const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Domain, Application, and Infrastructure
const UserRepository = require('./infrastructure/repositories/userRepository');
const UserUseCases = require('./application/useCases/userUseCases');
const UserController = require('./interface/controllers/userController');

// Initialize express app
const app = express();
const port = process.env.PORT || 3004;
console.log('Initializing Clean Architecture application...');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'clean-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'clean-combined.log' })
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
      title: 'Clean Architecture API',
      version: '1.0.0',
      description: 'API documentation for Clean Architecture pattern implementation',
    },
    servers: [
      {
        url: 'http://localhost:3004',
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
  logger.info(`Clean: ${req.method} ${req.url}`);
  next();
});

// Initialize dependencies
const userRepository = new UserRepository();
const userUseCases = new UserUseCases(userRepository);
const userController = new UserController(userUseCases);

// Routes
app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.json({ message: 'Welcome to Clean Architecture API' });
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
  logger.error(err.stack);
  res.status(500).json({ error: 'Clean Error: Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Clean server is running on port ${port}`);
  logger.info(`Clean server started on port ${port}`);
});

module.exports = app; 
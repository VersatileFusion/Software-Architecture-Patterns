const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Initialize express app
const app = express();
console.log('Initializing Hexagonal Architecture Application...');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'hexagonal-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'hexagonal-combined.log' })
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
      title: 'Hexagonal Architecture API',
      version: '1.0.0',
      description: 'API documentation for Hexagonal Architecture pattern implementation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/adapters/primary/http/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger documentation available at /api-docs');

// Logging middleware
app.use((req, res, next) => {
  logger.info(`Hexagonal: ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  logger.info('Hexagonal root endpoint accessed');
  res.json({ message: 'Welcome to Hexagonal Architecture API' });
});

// User routes
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const id = Date.now();
  const user = { id, name, email };
  res.status(201).json(user);
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  // In a real application, you would fetch the user from a database
  const user = { id: userId, name: 'Test User', email: 'test@example.com' };
  res.json(user);
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const updatedUser = { id: userId, name, email };
  res.json(updatedUser);
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  res.json({ message: 'User deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Hexagonal Error: Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Hexagonal server is running on port ${PORT}`);
  logger.info(`Hexagonal server started on port ${PORT}`);
});

module.exports = app; 
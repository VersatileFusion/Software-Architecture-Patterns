const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');
const userRoutes = require('./routes/users');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;
console.log('Initializing Express application...');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'monolithic-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'monolithic-combined.log' })
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
      title: 'Monolithic Architecture API',
      version: '1.0.0',
      description: 'API documentation for Monolithic Architecture pattern implementation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger documentation available at /api-docs');

// Logging middleware
app.use((req, res, next) => {
  logger.info(`Monolithic: ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.json({ message: 'Welcome to Monolithic Architecture API' });
});

// User routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Monolithic Error: Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Monolithic server is running on port ${port}`);
  logger.info(`Monolithic server started on port ${port}`);
});

module.exports = app; 
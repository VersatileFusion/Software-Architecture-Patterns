const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Initialize express app
const app = express();
console.log('Initializing User Service...');

// Configure logger
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
      title: 'User Service API',
      version: '1.0.0',
      description: 'User management microservice',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'User Service',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger documentation available at /api-docs');

// Logging middleware
app.use((req, res, next) => {
  logger.info(`User Service: ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  logger.info('User Service root endpoint accessed');
  res.json({ message: 'Welcome to User Service' });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'User Service Error: Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
  logger.info(`User Service started on port ${PORT}`);
});

module.exports = app; 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');
const httpProxy = require('http-proxy');

// Initialize express app
const app = express();
console.log('Initializing API Gateway...');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'gateway-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'gateway-combined.log' })
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
      title: 'API Gateway',
      version: '1.0.0',
      description: 'API Gateway for Microservices Architecture',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger documentation available at /api-docs');

// Create proxy instances for each service
const userServiceProxy = httpProxy.createProxyServer({ target: 'http://localhost:3001' });
const authServiceProxy = httpProxy.createProxyServer({ target: 'http://localhost:3002' });
const productServiceProxy = httpProxy.createProxyServer({ target: 'http://localhost:3003' });
const orderServiceProxy = httpProxy.createProxyServer({ target: 'http://localhost:3004' });

// Logging middleware
app.use((req, res, next) => {
  logger.info(`Gateway: ${req.method} ${req.url}`);
  next();
});

// Route requests to appropriate services
app.use('/api/users', (req, res) => {
  logger.info('Routing to User Service');
  userServiceProxy.web(req, res);
});

app.use('/api/auth', (req, res) => {
  logger.info('Routing to Auth Service');
  authServiceProxy.web(req, res);
});

app.use('/api/products', (req, res) => {
  logger.info('Routing to Product Service');
  productServiceProxy.web(req, res);
});

app.use('/api/orders', (req, res) => {
  logger.info('Routing to Order Service');
  orderServiceProxy.web(req, res);
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Gateway Error: Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
  logger.info(`API Gateway started on port ${PORT}`);
});

module.exports = app; 
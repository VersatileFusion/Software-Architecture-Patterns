const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');

// Initialize express app
const app = express();
const port = process.env.PORT || 3002;
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

// Logging middleware
app.use((req, res, next) => {
  logger.info(`User Service: ${req.method} ${req.url}`);
  next();
});

// In-memory storage for users
const users = new Map();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'User Service is running' });
});

// Get all users
app.get('/api/users', (req, res) => {
  const userList = Array.from(users.values());
  res.json(userList);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const id = Date.now().toString();
  const user = { id, name, email, createdAt: new Date(), updatedAt: new Date() };
  users.set(id, user);
  res.status(201).json(user);
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  user.name = name;
  user.email = email;
  user.updatedAt = new Date();
  users.set(req.params.id, user);
  res.json(user);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  if (!users.has(req.params.id)) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.delete(req.params.id);
  res.json({ message: 'User deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'User Service Error: Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`User Service is running on port ${port}`);
  logger.info(`User Service started on port ${port}`);
}); 
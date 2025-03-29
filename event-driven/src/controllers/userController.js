const winston = require('winston');

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

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        throw new Error('Name and email are required');
      }
      const user = await this.userService.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      logger.error('Error in createUser controller:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('User ID is required');
      }
      const user = await this.userService.getUser(id);
      res.json(user);
    } catch (error) {
      logger.error('Error in getUser controller:', error);
      res.status(404).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      logger.error('Error in getAllUsers controller:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      if (!id) {
        throw new Error('User ID is required');
      }
      const user = await this.userService.updateUser(id, name, email);
      res.json(user);
    } catch (error) {
      logger.error('Error in updateUser controller:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('User ID is required');
      }
      const user = await this.userService.deleteUser(id);
      res.json({ message: 'User deleted successfully', user });
    } catch (error) {
      logger.error('Error in deleteUser controller:', error);
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = UserController; 
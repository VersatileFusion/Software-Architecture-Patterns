const User = require('../domain/entities/user');
const eventManager = require('../events/eventManager');
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

class UserService {
  constructor() {
    this.users = new Map();
    this.events = eventManager.getEvents().USER;
  }

  async createUser(name, email) {
    try {
      const id = Date.now().toString();
      const user = new User(id, name, email);
      user.validate();
      
      this.users.set(id, user);
      eventManager.publish(this.events.CREATED, user);
      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  async getUser(id) {
    try {
      const user = this.users.get(id);
      if (!user) {
        throw new Error('User not found');
      }
      eventManager.publish(this.events.FETCHED, user);
      return user;
    } catch (error) {
      logger.error('Error getting user:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = Array.from(this.users.values());
      eventManager.publish(this.events.FETCH_ALL, users);
      return users;
    } catch (error) {
      logger.error('Error getting all users:', error);
      throw error;
    }
  }

  async updateUser(id, name, email) {
    try {
      const user = await this.getUser(id);
      user.update(name, email);
      this.users.set(id, user);
      eventManager.publish(this.events.UPDATED, user);
      return user;
    } catch (error) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.getUser(id);
      this.users.delete(id);
      eventManager.publish(this.events.DELETED, user);
      return user;
    } catch (error) {
      logger.error('Error deleting user:', error);
      throw error;
    }
  }
}

module.exports = UserService; 
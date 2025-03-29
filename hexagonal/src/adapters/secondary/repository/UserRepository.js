const IUserRepository = require('../../../application/ports/IUserRepository');
const User = require('../../../domain/entities/User');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'repository-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'repository-combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

class UserRepository extends IUserRepository {
  constructor() {
    super();
    this.users = new Map(); // In-memory storage for demo
  }

  async findById(id) {
    try {
      logger.info(`Finding user by ID: ${id}`);
      console.log('UserRepository: Finding user by ID:', id);

      const user = this.users.get(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      logger.error('Error finding user:', error);
      console.error('UserRepository: Error finding user:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      logger.info('Finding all users');
      console.log('UserRepository: Finding all users');

      return Array.from(this.users.values());
    } catch (error) {
      logger.error('Error finding all users:', error);
      console.error('UserRepository: Error finding all users:', error);
      throw error;
    }
  }

  async create(user) {
    try {
      logger.info('Creating user:', user);
      console.log('UserRepository: Creating user:', user);

      this.users.set(user.id, user);
      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      console.error('UserRepository: Error creating user:', error);
      throw error;
    }
  }

  async update(id, user) {
    try {
      logger.info(`Updating user with ID: ${id}`, user);
      console.log('UserRepository: Updating user:', { id, user });

      if (!this.users.has(id)) {
        throw new Error('User not found');
      }

      const updatedUser = new User(id, user.name, user.email);
      this.users.set(id, updatedUser);
      return updatedUser;
    } catch (error) {
      logger.error('Error updating user:', error);
      console.error('UserRepository: Error updating user:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      logger.info(`Deleting user with ID: ${id}`);
      console.log('UserRepository: Deleting user:', id);

      if (!this.users.has(id)) {
        throw new Error('User not found');
      }

      this.users.delete(id);
      return true;
    } catch (error) {
      logger.error('Error deleting user:', error);
      console.error('UserRepository: Error deleting user:', error);
      throw error;
    }
  }
}

module.exports = UserRepository; 
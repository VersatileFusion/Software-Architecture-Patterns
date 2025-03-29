const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');
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
    this.users = new Map();
  }

  async findById(id) {
    return this.users.get(id);
  }

  async findAll() {
    const users = Array.from(this.users.values());
    return users || [];
  }

  async save(user) {
    this.users.set(user.id, user);
    return user;
  }

  async delete(id) {
    this.users.delete(id);
  }
}

module.exports = UserRepository; 
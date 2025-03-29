const User = require('../../domain/entities/User');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'useCase-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'useCase-combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    try {
      logger.info('Creating new user:', userData);
      console.log('CreateUserUseCase: Creating new user:', userData);

      // Create user entity
      const user = new User(
        Date.now(), // Simple ID generation for demo
        userData.name,
        userData.email
      );

      // Validate user
      user.validate();

      // Save user
      const createdUser = await this.userRepository.create(user);
      
      logger.info('User created successfully:', createdUser);
      console.log('CreateUserUseCase: User created successfully:', createdUser);

      return createdUser;
    } catch (error) {
      logger.error('Error creating user:', error);
      console.error('CreateUserUseCase: Error creating user:', error);
      throw error;
    }
  }
}

module.exports = CreateUserUseCase; 
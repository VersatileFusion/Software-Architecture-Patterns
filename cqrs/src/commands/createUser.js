const User = require('../models/user');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

class CreateUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        try {
            const id = Date.now().toString();
            const user = new User(id, userData.name, userData.email);
            user.validate();
            
            logger.info('Creating user', { userId: id, userData });
            const createdUser = await this.userRepository.create(user);
            
            logger.info('User created successfully', { userId: id });
            return createdUser.toJSON();
        } catch (error) {
            logger.error('Error creating user', { error: error.message });
            throw error;
        }
    }
}

module.exports = CreateUserCommand; 
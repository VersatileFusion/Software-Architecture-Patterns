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

class UpdateUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(id, userData) {
        try {
            const existingUser = await this.userRepository.findById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }

            const user = new User(id, userData.name || existingUser.name, userData.email || existingUser.email);
            user.validate();
            user.update(userData);
            
            logger.info('Updating user', { userId: id, userData });
            const updatedUser = await this.userRepository.update(id, user);
            
            logger.info('User updated successfully', { userId: id });
            return updatedUser.toJSON();
        } catch (error) {
            logger.error('Error updating user', { error: error.message });
            throw error;
        }
    }
}

module.exports = UpdateUserCommand; 
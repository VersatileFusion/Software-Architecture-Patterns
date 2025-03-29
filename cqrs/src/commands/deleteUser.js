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

class DeleteUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(id) {
        try {
            logger.info('Deleting user', { userId: id });
            await this.userRepository.delete(id);
            logger.info('User deleted successfully', { userId: id });
            return true;
        } catch (error) {
            logger.error('Error deleting user', { error: error.message });
            throw error;
        }
    }
}

module.exports = DeleteUserCommand; 
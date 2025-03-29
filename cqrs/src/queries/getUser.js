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

class GetUserQuery {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(id) {
        try {
            logger.info('Fetching user', { userId: id });
            const user = await this.userRepository.findById(id);
            
            if (!user) {
                logger.warn('User not found', { userId: id });
                throw new Error('User not found');
            }
            
            logger.info('User fetched successfully', { userId: id });
            return user.toJSON();
        } catch (error) {
            logger.error('Error fetching user', { error: error.message });
            throw error;
        }
    }
}

module.exports = GetUserQuery; 
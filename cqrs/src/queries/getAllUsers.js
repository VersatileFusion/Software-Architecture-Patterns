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

class GetAllUsersQuery {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute() {
        try {
            logger.info('Fetching all users');
            const users = await this.userRepository.findAll();
            logger.info('All users fetched successfully', { count: users.length });
            return users.map(user => user.toJSON());
        } catch (error) {
            logger.error('Error fetching all users', { error: error.message });
            throw error;
        }
    }
}

module.exports = GetAllUsersQuery; 
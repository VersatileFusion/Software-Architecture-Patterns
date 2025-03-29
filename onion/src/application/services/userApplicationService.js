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

class UserApplicationService {
    constructor(userService) {
        this.userService = userService;
    }

    async createUser(name, email) {
        try {
            logger.info('Creating user', { name, email });
            const user = await this.userService.createUser(name, email);
            logger.info('User created successfully', { userId: user.id });
            return user.toJSON();
        } catch (error) {
            logger.error('Error creating user', { error: error.message });
            throw error;
        }
    }

    async getUser(id) {
        try {
            logger.info('Fetching user', { userId: id });
            const user = await this.userService.getUser(id);
            logger.info('User fetched successfully', { userId: id });
            return user.toJSON();
        } catch (error) {
            logger.error('Error fetching user', { error: error.message });
            throw error;
        }
    }

    async getAllUsers() {
        try {
            logger.info('Fetching all users');
            const users = await this.userService.getAllUsers();
            logger.info('All users fetched successfully', { count: users.length });
            return users.map(user => user.toJSON());
        } catch (error) {
            logger.error('Error fetching all users', { error: error.message });
            throw error;
        }
    }

    async updateUser(id, name, email) {
        try {
            logger.info('Updating user', { userId: id, name, email });
            const user = await this.userService.updateUser(id, name, email);
            logger.info('User updated successfully', { userId: id });
            return user.toJSON();
        } catch (error) {
            logger.error('Error updating user', { error: error.message });
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            logger.info('Deleting user', { userId: id });
            await this.userService.deleteUser(id);
            logger.info('User deleted successfully', { userId: id });
            return true;
        } catch (error) {
            logger.error('Error deleting user', { error: error.message });
            throw error;
        }
    }
}

module.exports = UserApplicationService; 
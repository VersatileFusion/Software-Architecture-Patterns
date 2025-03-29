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

class UserEventHandlers {
  onUserCreated(user) {
    logger.info('User created event handled:', { user });
    // Here you could trigger additional actions like:
    // - Sending welcome email
    // - Creating user profile
    // - Notifying admin
  }

  onUserUpdated(user) {
    logger.info('User updated event handled:', { user });
    // Here you could trigger additional actions like:
    // - Updating search index
    // - Syncing with external systems
  }

  onUserDeleted(user) {
    logger.info('User deleted event handled:', { user });
    // Here you could trigger additional actions like:
    // - Cleaning up user data
    // - Notifying related services
  }

  onUserFetched(user) {
    logger.info('User fetched event handled:', { user });
    // Here you could trigger additional actions like:
    // - Updating last access timestamp
    // - Recording analytics
  }

  onUsersFetchAll(users) {
    logger.info('Users fetch all event handled:', { count: users.length });
    // Here you could trigger additional actions like:
    // - Caching results
    // - Recording analytics
  }
}

module.exports = new UserEventHandlers(); 
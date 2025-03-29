const amqp = require('amqplib');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'publisher-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'publisher-combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

class UserPublisher {
  constructor() {
    this.channel = null;
    this.connection = null;
    this.connect();
  }

  async connect() {
    try {
      this.connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();
      console.log('Publisher connected to RabbitMQ');
      logger.info('Publisher connected to RabbitMQ');

      // Declare queues
      await this.channel.assertQueue('user_created', { durable: true });
      await this.channel.assertQueue('user_updated', { durable: true });
      await this.channel.assertQueue('user_deleted', { durable: true });
    } catch (error) {
      logger.error('Publisher connection error:', error);
      console.error('Failed to connect publisher to RabbitMQ:', error);
    }
  }

  async publishUserCreated(userData) {
    try {
      const message = JSON.stringify({
        event: 'user_created',
        data: userData,
        timestamp: new Date().toISOString()
      });

      this.channel.sendToQueue('user_created', Buffer.from(message));
      logger.info('Published user_created event:', userData);
      console.log('Published user_created event:', userData);
    } catch (error) {
      logger.error('Error publishing user_created event:', error);
      console.error('Failed to publish user_created event:', error);
    }
  }

  async publishUserUpdated(userData) {
    try {
      const message = JSON.stringify({
        event: 'user_updated',
        data: userData,
        timestamp: new Date().toISOString()
      });

      this.channel.sendToQueue('user_updated', Buffer.from(message));
      logger.info('Published user_updated event:', userData);
      console.log('Published user_updated event:', userData);
    } catch (error) {
      logger.error('Error publishing user_updated event:', error);
      console.error('Failed to publish user_updated event:', error);
    }
  }

  async publishUserDeleted(userId) {
    try {
      const message = JSON.stringify({
        event: 'user_deleted',
        data: { userId },
        timestamp: new Date().toISOString()
      });

      this.channel.sendToQueue('user_deleted', Buffer.from(message));
      logger.info('Published user_deleted event:', { userId });
      console.log('Published user_deleted event:', { userId });
    } catch (error) {
      logger.error('Error publishing user_deleted event:', error);
      console.error('Failed to publish user_deleted event:', error);
    }
  }

  async close() {
    try {
      await this.channel.close();
      await this.connection.close();
      console.log('Publisher connection closed');
      logger.info('Publisher connection closed');
    } catch (error) {
      logger.error('Error closing publisher connection:', error);
      console.error('Failed to close publisher connection:', error);
    }
  }
}

module.exports = new UserPublisher(); 
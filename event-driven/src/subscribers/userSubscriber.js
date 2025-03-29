const amqp = require('amqplib');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'subscriber-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'subscriber-combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

class UserSubscriber {
  constructor() {
    this.channel = null;
    this.connection = null;
    this.connect();
  }

  async connect() {
    try {
      this.connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();
      console.log('Subscriber connected to RabbitMQ');
      logger.info('Subscriber connected to RabbitMQ');

      // Declare queues
      await this.channel.assertQueue('user_created', { durable: true });
      await this.channel.assertQueue('user_updated', { durable: true });
      await this.channel.assertQueue('user_deleted', { durable: true });

      // Set up consumers
      this.setupConsumers();
    } catch (error) {
      logger.error('Subscriber connection error:', error);
      console.error('Failed to connect subscriber to RabbitMQ:', error);
    }
  }

  setupConsumers() {
    // User Created Consumer
    this.channel.consume('user_created', async (msg) => {
      try {
        const event = JSON.parse(msg.content);
        logger.info('Received user_created event:', event);
        console.log('Processing user_created event:', event);

        // Process the event
        await this.handleUserCreated(event.data);

        // Acknowledge the message
        this.channel.ack(msg);
      } catch (error) {
        logger.error('Error processing user_created event:', error);
        console.error('Failed to process user_created event:', error);
        // Reject the message and requeue it
        this.channel.nack(msg, false, true);
      }
    });

    // User Updated Consumer
    this.channel.consume('user_updated', async (msg) => {
      try {
        const event = JSON.parse(msg.content);
        logger.info('Received user_updated event:', event);
        console.log('Processing user_updated event:', event);

        // Process the event
        await this.handleUserUpdated(event.data);

        // Acknowledge the message
        this.channel.ack(msg);
      } catch (error) {
        logger.error('Error processing user_updated event:', error);
        console.error('Failed to process user_updated event:', error);
        // Reject the message and requeue it
        this.channel.nack(msg, false, true);
      }
    });

    // User Deleted Consumer
    this.channel.consume('user_deleted', async (msg) => {
      try {
        const event = JSON.parse(msg.content);
        logger.info('Received user_deleted event:', event);
        console.log('Processing user_deleted event:', event);

        // Process the event
        await this.handleUserDeleted(event.data.userId);

        // Acknowledge the message
        this.channel.ack(msg);
      } catch (error) {
        logger.error('Error processing user_deleted event:', error);
        console.error('Failed to process user_deleted event:', error);
        // Reject the message and requeue it
        this.channel.nack(msg, false, true);
      }
    });
  }

  async handleUserCreated(userData) {
    // Implement user creation logic
    logger.info('Handling user creation:', userData);
    console.log('Handling user creation:', userData);
  }

  async handleUserUpdated(userData) {
    // Implement user update logic
    logger.info('Handling user update:', userData);
    console.log('Handling user update:', userData);
  }

  async handleUserDeleted(userId) {
    // Implement user deletion logic
    logger.info('Handling user deletion:', userId);
    console.log('Handling user deletion:', userId);
  }

  async close() {
    try {
      await this.channel.close();
      await this.connection.close();
      console.log('Subscriber connection closed');
      logger.info('Subscriber connection closed');
    } catch (error) {
      logger.error('Error closing subscriber connection:', error);
      console.error('Failed to close subscriber connection:', error);
    }
  }
}

module.exports = new UserSubscriber(); 
const { EventEmitter2 } = require('eventemitter2');
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

class EventManager {
  constructor() {
    this.emitter = new EventEmitter2({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      maxListeners: 20,
      verboseMemoryLeak: true
    });
    
    // Event constants
    this.events = {
      USER: {
        CREATED: 'user.created',
        UPDATED: 'user.updated',
        DELETED: 'user.deleted',
        FETCHED: 'user.fetched',
        FETCH_ALL: 'user.fetchAll'
      }
    };
  }

  subscribe(eventName, listener) {
    logger.info(`Subscribing to event: ${eventName}`);
    this.emitter.on(eventName, listener);
  }

  publish(eventName, data) {
    logger.info(`Publishing event: ${eventName}`, { data });
    this.emitter.emit(eventName, data);
  }

  unsubscribe(eventName, listener) {
    logger.info(`Unsubscribing from event: ${eventName}`);
    this.emitter.off(eventName, listener);
  }

  // Helper method to get all event names
  getEvents() {
    return this.events;
  }
}

// Create and export a singleton instance
const eventManager = new EventManager();
module.exports = eventManager; 
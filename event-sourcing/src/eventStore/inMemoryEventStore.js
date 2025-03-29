class InMemoryEventStore {
    constructor() {
        this.events = [];
        this.aggregates = new Map();
    }

    async save(event) {
        this.events.push(event);
        const aggregateEvents = this.events.filter(e => e.aggregateId === event.aggregateId);
        this.aggregates.set(event.aggregateId, aggregateEvents);
        return event;
    }

    async getEvents(aggregateId) {
        return this.aggregates.get(aggregateId) || [];
    }

    async getAllEvents() {
        return this.events;
    }

    async getEventsByType(type) {
        return this.events.filter(event => event.type === type);
    }

    async getEventsByDateRange(startDate, endDate) {
        return this.events.filter(event => 
            event.timestamp >= startDate && event.timestamp <= endDate
        );
    }

    async replay(aggregateId) {
        const events = await this.getEvents(aggregateId);
        return events.sort((a, b) => a.timestamp - b.timestamp);
    }

    async getLatestEvent(aggregateId) {
        const events = await this.getEvents(aggregateId);
        return events[events.length - 1];
    }

    async getEventCount(aggregateId) {
        const events = await this.getEvents(aggregateId);
        return events.length;
    }
}

module.exports = InMemoryEventStore; 
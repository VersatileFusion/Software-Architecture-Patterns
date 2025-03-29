const IUserRepository = require('../../application/interfaces/IUserRepository');

class InMemoryUserRepository extends IUserRepository {
    constructor() {
        super();
        this.users = new Map();
        this.events = new Map();
    }

    async findById(id) {
        return this.users.get(id);
    }

    async findAll() {
        return Array.from(this.users.values());
    }

    async save(user) {
        this.users.set(user.id, user);
        return user;
    }

    async delete(id) {
        if (!this.users.has(id)) {
            throw new Error('User not found');
        }
        this.users.delete(id);
        return true;
    }

    async saveEvent(event) {
        const aggregateEvents = this.events.get(event.aggregateId) || [];
        aggregateEvents.push(event);
        this.events.set(event.aggregateId, aggregateEvents);
        return event;
    }

    async getEvents(aggregateId) {
        return this.events.get(aggregateId) || [];
    }
}

module.exports = InMemoryUserRepository; 
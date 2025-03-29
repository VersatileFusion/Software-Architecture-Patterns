const User = require('../models/user');
const UserCreated = require('../events/userCreated');
const UserUpdated = require('../events/userUpdated');
const UserDeleted = require('../events/userDeleted');

class UserProjection {
    constructor(eventStore) {
        this.eventStore = eventStore;
        this.users = new Map();
    }

    async rebuild() {
        const events = await this.eventStore.getAllEvents();
        this.users.clear();

        for (const event of events) {
            await this.apply(event);
        }
    }

    async apply(event) {
        switch (event.type) {
            case 'UserCreated':
                await this.handleUserCreated(event);
                break;
            case 'UserUpdated':
                await this.handleUserUpdated(event);
                break;
            case 'UserDeleted':
                await this.handleUserDeleted(event);
                break;
        }
    }

    async handleUserCreated(event) {
        const user = new User(event.aggregateId, event.name, event.email);
        this.users.set(event.aggregateId, user);
    }

    async handleUserUpdated(event) {
        const user = this.users.get(event.aggregateId);
        if (user) {
            user.update({
                name: event.name,
                email: event.email
            });
        }
    }

    async handleUserDeleted(event) {
        this.users.delete(event.aggregateId);
    }

    async getUser(id) {
        return this.users.get(id);
    }

    async getAllUsers() {
        return Array.from(this.users.values());
    }

    async getUserHistory(id) {
        const events = await this.eventStore.getEvents(id);
        return events.map(event => event.toJSON());
    }
}

module.exports = UserProjection; 
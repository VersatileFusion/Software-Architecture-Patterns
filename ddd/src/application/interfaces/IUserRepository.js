class IUserRepository {
    async findById(id) {
        throw new Error('Method not implemented');
    }

    async findAll() {
        throw new Error('Method not implemented');
    }

    async save(user) {
        throw new Error('Method not implemented');
    }

    async delete(id) {
        throw new Error('Method not implemented');
    }

    async saveEvent(event) {
        throw new Error('Method not implemented');
    }

    async getEvents(aggregateId) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserRepository; 
const IUserRepository = require('../../domain/interfaces/IUserRepository');

class UserRepository extends IUserRepository {
    constructor() {
        super();
        this.users = new Map();
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
        this.users.delete(id);
    }
}

module.exports = UserRepository; 
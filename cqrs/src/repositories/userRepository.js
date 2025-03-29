class UserRepository {
    constructor() {
        this.users = new Map();
    }

    async findById(id) {
        return this.users.get(id);
    }

    async findAll() {
        return Array.from(this.users.values());
    }

    async create(user) {
        this.users.set(user.id, user);
        return user;
    }

    async update(id, user) {
        if (!this.users.has(id)) {
            throw new Error('User not found');
        }
        this.users.set(id, user);
        return user;
    }

    async delete(id) {
        if (!this.users.has(id)) {
            throw new Error('User not found');
        }
        this.users.delete(id);
        return true;
    }
}

module.exports = UserRepository; 
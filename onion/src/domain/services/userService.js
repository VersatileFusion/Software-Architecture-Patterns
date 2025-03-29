const User = require('../entities/user');
const IUserService = require('../interfaces/IUserService');

class UserService extends IUserService {
    constructor(userRepository) {
        super();
        this.userRepository = userRepository;
    }

    async createUser(name, email) {
        const id = Date.now().toString();
        const user = new User(id, name, email);
        user.validate();
        return await this.userRepository.save(user);
    }

    async getUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async updateUser(id, name, email) {
        const user = await this.getUser(id);
        user.update(name, email);
        return await this.userRepository.save(user);
    }

    async deleteUser(id) {
        const user = await this.getUser(id);
        await this.userRepository.delete(id);
        return user;
    }
}

module.exports = UserService; 
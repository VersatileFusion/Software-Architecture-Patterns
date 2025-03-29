class UserController {
  constructor(userUseCases) {
    this.userUseCases = userUseCases;
  }

  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await this.userUseCases.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await this.userUseCases.getUser(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userUseCases.getAllUsers();
      if (!Array.isArray(users)) {
        throw new Error('Invalid response from repository');
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await this.userUseCases.updateUser(req.params.id, name, email);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await this.userUseCases.deleteUser(req.params.id);
      res.json({ message: 'User deleted successfully', user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = UserController; 
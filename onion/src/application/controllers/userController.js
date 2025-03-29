class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await this.userService.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await this.userService.getUser(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await this.userService.updateUser(req.params.id, name, email);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      res.json({ message: 'User deleted successfully', user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = UserController; 
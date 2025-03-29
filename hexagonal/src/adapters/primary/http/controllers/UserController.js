const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'controller-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'controller-combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Create a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *         description: Invalid input
   */
  async createUser(req, res) {
    try {
      logger.info('Creating new user:', req.body);
      console.log('UserController: Creating new user:', req.body);

      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      logger.error('Error creating user:', error);
      console.error('UserController: Error creating user:', error);
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Get user by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User details
   *       404:
   *         description: User not found
   */
  async getUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      logger.info(`Fetching user with ID: ${userId}`);
      console.log(`UserController: Fetching user with ID: ${userId}`);

      const user = await this.userService.getUser(userId);
      res.json(user);
    } catch (error) {
      logger.error('Error fetching user:', error);
      console.error('UserController: Error fetching user:', error);
      res.status(404).json({ error: 'User not found' });
    }
  }

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Update user
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: User updated successfully
   *       404:
   *         description: User not found
   */
  async updateUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      logger.info(`Updating user with ID: ${userId}`, req.body);
      console.log(`UserController: Updating user with ID: ${userId}`, req.body);

      const user = await this.userService.updateUser(userId, req.body);
      res.json(user);
    } catch (error) {
      logger.error('Error updating user:', error);
      console.error('UserController: Error updating user:', error);
      res.status(404).json({ error: 'User not found' });
    }
  }

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Delete user
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   */
  async deleteUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      logger.info(`Deleting user with ID: ${userId}`);
      console.log(`UserController: Deleting user with ID: ${userId}`);

      await this.userService.deleteUser(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      logger.error('Error deleting user:', error);
      console.error('UserController: Error deleting user:', error);
      res.status(404).json({ error: 'User not found' });
    }
  }
}

module.exports = UserController; 
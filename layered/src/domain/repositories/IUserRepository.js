/**
 * Interface for User Repository operations
 */
class IUserRepository {
  /**
   * Find a user by ID
   * @param {number} id - User ID
   * @returns {Promise<User>} User object
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Find all users
   * @returns {Promise<User[]>} Array of User objects
   */
  async findAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Create a new user
   * @param {User} user - User object to create
   * @returns {Promise<User>} Created User object
   */
  async create(user) {
    throw new Error('Method not implemented');
  }

  /**
   * Update an existing user
   * @param {number} id - User ID
   * @param {User} user - Updated User object
   * @returns {Promise<User>} Updated User object
   */
  async update(id, user) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} Success status
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = IUserRepository; 
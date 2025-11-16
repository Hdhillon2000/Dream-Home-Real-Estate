
import UserModel from '../models/user.model.js';


/**
 * Controller for Users
 */
class UserController {
  /**
   * Get user by ID
   * @param {number} userId - User ID
   * @returns {Object|null} User or null
   */
  async getUserById(userId) {
    return await UserModel.findById(userId);
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Object} Created user
   */
  async createUser(userData) {
    return await UserModel.create(userData);
  }

  /**
   * Update user by ID
   * @param {number} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Object|null} Updated user or null
   */
  async updateUser(userId, updateData) {
    await UserModel.update({ user_id: userId }, updateData);
    return await this.getUserById(userId);
  }
}

export default new UserController();





/**
 * Example usages of the User model methods     
 */
// Example: Find all active users
//const activeUsers = await User.find({ where: { is_active: true } });

// Example: Find user by ID
// const user = await User.findById(123);

// Example: Create new user
// const newUser = await User.create({
//   email: 'john@example.com',
//   password_hash: 'hashed_password',
//   is_active: false
// });

// Example: Update user
// await User.update({ user_id: 123 }, { is_active: true });

// Example: Find with pagination and ordering
// const users = await User.find({
//   where: { is_active: true },
//   orderBy: 'created_at DESC',
//   limit: 10,
//   offset: 0
// });

// Example: Count users
// const totalUsers = await User.count({ is_active: true });

// Example: Delete user (cascades to profile)
// await User.delete({ user_id: 123 });
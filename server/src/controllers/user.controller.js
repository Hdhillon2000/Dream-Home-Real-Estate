
import express from 'express';
import UserModel from '../models/user.model.js';


/**
 * Controller for Users
 */
export default {
  
  /**
   * Get user by ID
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  async getUserById(req, res) {
    try {
      const { userId } = req.params;
      const user = await UserModel.findById(userId);

      if (!user) return res.status(404).json({ message: 'User not found' });
      
      res.status(200).json(user);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    };
  },

  /**
   * Create a new user
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await UserModel.create(userData);
      res.status(201).json(newUser);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    };
  },

  /**
   * Update user by ID
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const updateData = req.body;
      await UserModel.update({ user_id: userId }, updateData);
      const updatedUser = await UserModel.findById(userId);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    };
  },

  /**
   * Get all active users
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  async getActiveUsers(req, res) {
    try {
      const activeUsers = await UserModel.find({ where: { is_active: true } });
      res.status(200).json(activeUsers);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error fetching active users', error: error.message });
    };
  },

  /**
   * Get users with pagination and ordering
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  async getUsersPaginated(req, res) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const users = await UserModel.find({
        where: { is_active: true },
        orderBy: 'created_at DESC',
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      res.status(200).json(users);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    };
  },

  /**
   * Count users
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  async countUsers(req, res) {
    try {
      const totalUsers = await UserModel.count({ is_active: true });
      res.status(200).json({ total: totalUsers });
    } 
    catch (error) {
      res.status(500).json({ message: 'Error counting users', error: error.message });
    };
  },

  /**
   * Delete user by ID
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      await UserModel.delete({ user_id: userId });
      res.status(200).json({ message: 'User deleted successfully' });
    } 
    catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    };
  }

};

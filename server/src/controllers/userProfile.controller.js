
import UserProfileModel from '../models/userProfile.model.js';
import UserModel from '../models/user.model.js';


/**
 * Controller for User Profiles
 */
export default {
  
  /**
   * Get user profile by user ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getProfileByUserId(req, res) {
    try {
      const { userId } = req.params;
      const profile = await UserProfileModel.findOne({ user_id: userId });
      if (!profile) return res.status(404).json({ message: 'Profile not found' });
      
      res.status(200).json(profile);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    };
  },

  /**
   * Create or update user profile (upsert)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async upsertUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const profileData = req.body;

      // Check if user exists
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let profile = await UserProfileModel.findOne({ user_id: userId });
      if (profile) {
        // Update existing profile
        await UserProfileModel.update({ user_id: userId }, profileData);
        profile = await UserProfileModel.findOne({ user_id: userId });
      } 
      else {
        // Create new profile
        profile = await UserProfileModel.create({ user_id: userId, ...profileData });
      }
      res.status(200).json(profile);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error upserting profile', error: error.message });
    };
  },

  /**
   * Delete user profile by user ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const profile = await UserProfileModel.findOne({ user_id: userId });

      if (!profile) return res.status(404).json({ message: 'Profile not found' });
      
      await UserProfileModel.delete({ user_id: userId });
      res.status(200).json({ message: 'Profile deleted successfully' });
    } 
    catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error: error.message });
    };
  }

};


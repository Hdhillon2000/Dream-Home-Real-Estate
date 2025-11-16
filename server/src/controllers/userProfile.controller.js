
import UserProfileModel from '../models/userProfile.model.js';
import UserModel from '../models/user.model.js';

/**
 * Controller for User Profiles
 */
class UserProfileController {
  /**
   * Get user profile by user ID
   * @param {number} userId - User ID
   * @returns {Object|null} User profile or null
   */
  async getProfileByUserId(userId) {
    return await UserProfileModel.findOne({ user_id: userId });
  }

  /**
   * Create or update user profile
   * @param {number} userId - User ID
   * @param {Object} profileData - Profile data
   * @returns {Object} Created or updated profile
   */
  async upsertUserProfile(userId, profileData) {
    let profile = await this.getProfileByUserId(userId);
    if (profile) {
      // Update existing profile
      await UserProfileModel.update({ user_id: userId }, profileData);
      profile = await this.getProfileByUserId(userId);
    } else {
      // Create new profile
      profile = await UserProfileModel.create({ user_id: userId, ...profileData });
    }
    return profile;
  }
}

export default new UserProfileController();
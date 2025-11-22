

// utils/merge_user_profile.js
import UserProfileModel from '../models/userProfile.model.js';

/**
 * Merge user and profile data
 * @param {boolean} includeSensitive - Whether to include sensitive data (e.g., password_hash)
 * @param {Object} user - User object (from UserModel)
 * @returns {Promise<Object>} Merged user and profile
 */
export default async (includeSensitive, user) => {
  // Fetch the user's profile
  const profile = await UserProfileModel.findOne({ user_id: user.user_id });

  // Merge user and profile
  const merged = { ...user };

  // Attach profile if it exists
  if (profile) {
    merged.profile = profile;
  }

  // Remove sensitive data if needed
  if (!includeSensitive && merged.password_hash) {
    delete merged.password_hash;
  }

  return merged;
};



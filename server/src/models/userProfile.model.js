
import createModel from '../mysql/model.js';


const UserProfileModel = await createModel('UserProfiles', {
  primaryKey: 'profile_id',
  fields: ['profile_id', 'user_id', 'first_name', 'last_name']
});
export default UserProfileModel;
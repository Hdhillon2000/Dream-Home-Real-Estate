
import createModel from '../mysql/model.js';


const UserProfileModel = await createModel('UserProfiles', { primaryKey: 'profile_id' });


export default UserProfileModel;
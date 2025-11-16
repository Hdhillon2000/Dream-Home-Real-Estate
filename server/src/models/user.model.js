
import createModel from '../mysql/model.js';


const UserModel = createModel('Users', {
  primaryKey: 'user_id',
  fields: ['user_id', 'email', 'password_hash', 'is_active', 'created_at', 'updated_at']
});
export default UserModel;

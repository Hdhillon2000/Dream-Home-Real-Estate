
import createModel from '../mysql/model.js';
import bcrypt from 'bcrypt';


const UserModel = createModel('Users', { primaryKey: 'user_id' });

UserModel.comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export default UserModel;

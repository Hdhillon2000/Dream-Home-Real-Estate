
import { Router } from 'express';
import userController from '../controllers/user.controller.js';


export default Router()

  .get('/users/:userId', userController.getUserById)
  .post('/users', userController.createUser)
  .put('/users/:userId', userController.updateUser)
  .get('/users/active', userController.getActiveUsers)
  .get('/users', userController.getUsersPaginated)
  .get('/users/count', userController.countUsers)
  .delete('/users/:userId', userController.deleteUser);

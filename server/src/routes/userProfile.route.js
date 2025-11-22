
import { Router } from 'express';
import profileController from '../controllers/userProfile.controller.js';


export default Router()

  .get('/profiles/:userId', profileController.getProfileByUserId)
  .put('/profiles/:userId', profileController.upsertUserProfile)
  .delete('/profiles/:userId', profileController.deleteUserProfile);

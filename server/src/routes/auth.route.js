
import { Router } from 'express';
import Controller from '../controllers/auth.controller.js';
import isAuthorized from '../middlewares/auth.js';

export default Router()
  .get('/validate', isAuthorized, Controller.validate)
  .post('/logout', Controller.logout)
  .post('/login', Controller.loginUser);

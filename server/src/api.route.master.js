
import express from 'express';

import linksRouter from './routes/links.js';
import userRouter from './routes/users.route.js';
import profileRouter from './routes/userProfile.route.js';


/**
 * Master Router for all API routes
 * @param {express.Express} app
 */
export default (app) => {

  app.use('/api/test', linksRouter);
  app.use('/api/users', userRouter);
  app.use('/api/profiles', profileRouter);

  app.get('/api/health', (_, res) => {
    res.status(200).json({ status: 'OK' });
  });

};

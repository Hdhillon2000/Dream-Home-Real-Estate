
import express from 'express';

import authRouter from './routes/auth.route.js';

import userRouter from './routes/users.route.js';
import profileRouter from './routes/userProfile.route.js';

import userApprovalRoutes from './routes/userApproval.routes.js';


/**
 * Master Router for all API routes
 * @param {express.Express} app
 */
export default (app) => {
  app
    .use('/api/auth', authRouter)

    .use('/api/users', userRouter)
    .use('/api/profiles', profileRouter)
    .use('/api/approvals', userApprovalRoutes)

    .get('/api/health', (_, res) => {
      res.status(200).json({ status: 'OK' });
    });

};

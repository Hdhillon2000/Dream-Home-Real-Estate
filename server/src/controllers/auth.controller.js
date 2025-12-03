
import express from 'express';
import UserModel from '../models/user.model.js';
import generateToken from '../utils/jwt.js';
import mergeUserProfile from '../utils/mergeProfile.js';


export default {

  /**
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @returns 
   */
  validate: async (req, res) => {
    const user = await UserModel.findById(req.user.user_id);
    if (!user) return res.status(404).json('User not found');
    req.user = await mergeUserProfile(false, user);
    return res.status(200).json({ user: req.user });
  },

  /**
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @returns 
   */
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json('User not found');

      if (!await UserModel.comparePassword(password, user.password_hash))
        return res.status(401).json('Invalid password');

      const token = generateToken(user);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000
      });

      req.user = await mergeUserProfile(true, user);
      return res.status(200).json({ user: req.user });
    } 
    catch (e) {
      return res.status(500).json('Internal Server Error');
    };
  },


  /**
   * @param {express.Request} _ 
   * @param {express.Response} res 
   * @returns 
   */
  logout: (_, res) => {
    res.clearCookie('token');
    return res.status(200).json("Logged out successfully");
  }

};

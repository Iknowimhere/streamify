import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (!token) {
      res.status(400).json({ message: 'Please login!!' });
      return;
    }

    let decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      res.status(400).json({ message: 'Session expired' });
      return;
    }
    let user = await User.findById(decode.userId).select('-password');
    if (!user) {
      res.status(400).json({ message: 'User doesnt exist!!' });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('Error in protectRoute middleware', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

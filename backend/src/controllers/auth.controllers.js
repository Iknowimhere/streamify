import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

let generateToken = async (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const signup = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'please fill all fields' });
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!!' });
    }
    //profile pic
    let idx = Math.floor(Math.random() * 100) + 1;
    let profilePic = `https://avatar.iran.liara.run/public/${idx}.png`;

    let newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: profilePic,
    });

    //create strem user
    try {
      await upsertStreamUser({
        id: newUser._id,
        name: newUser.fullName,
        image: newUser.profilePic || '',
      });
      console.log('Stream useer created for', newUser.fullName);
    } catch (error) {
      console.log('Error creating stream user', error.message);
    }

    let token = generateToken(newUser._id);
    res.cookie('jwt', token, {
      maXage: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log('error signing up user', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: 'Email dosent exist' });
      return;
    }
    let isMatch = existingUser.matchPassword(password, existingUser.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Password doesnt match' });
      return;
    }
    let token = await generateToken(existingUser._id);
    res.cookie('jwt', token, {
      maXage: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ success: true, existingUser });
  } catch (error) {}
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout successfull!!' });
};

export const onboarding = async (req, res) => {
    // let {email,}
    try {
        
    } catch (error) {
        
    }
};

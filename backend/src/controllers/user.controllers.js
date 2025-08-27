import FriendRequest from '../models/FriendRequest.js';
import User from '../models/User.js';

export const getRecommendedUsers = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let currentUser = req.user;
    let users = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { $nin: currentUser.friends },
        { isOnboarded: true },
      ],
    })
      .select('-password')
      .limit(10);
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error in getRecommendedUsers controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getFriends = async (req, res) => {
  try {
    let currentUser = req.user;
    let friends = await User.find({ _id: { $in: currentUser.friends } }).select(
      '-password'
    );
    res.status(200).json({ success: true, friends });
  } catch (error) {
    console.error('Error in getFriends controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    let { id: recipientId } = req.params;
    let sender = req.user._id;

    if (sender.toString() === recipientId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot send friend request to yourself.',
      });
    }

    let recipient = await User.findById(recipientId);
    if (!recipient) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
    }

    if (recipient.friends.includes(sender)) {
      return res.status(400).json({
        success: false,
        message: 'You are already friends with this user.',
      });
    }

    let existingRequest = await FriendRequest.findOne({
      $or: [
        { sender, recipient: recipientId },
        { sender: recipientId, recipient: sender },
      ],
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ success: false, message: 'Friend request already sent.' });
    }

    let friendRequest = new FriendRequest({ sender, recipient: recipientId });
    await friendRequest.save();
    res.status(201).json({ success: true, friendRequest });
  } catch (error) {
    console.error('Error in sendFriendRequest controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const acceptFriendRequest = async (req, res) => {
  let { id } = req.params;

  try {
    let friendRequest = await FriendRequest.findById(id);
    if (!friendRequest) {
      return res
        .status(404)
        .json({ success: false, message: 'Friend request not found.' });
    }
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to accept this request.',
      });
    }
    friendRequest.status = 'accepted';
    await friendRequest.save();
    res
      .status(200)
      .json({ success: true, message: 'Friend request accepted.' });
  } catch (error) {
    console.error('Error in acceptFriendRequest controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    let recipientId = req.user._id;
    let friendRequests = await FriendRequest.find({
      recipient: recipientId,
      status: 'pending',
    }).populate('sender', '-password');

    let acceptedRequests = await FriendRequest.find({
      sender: req.user._id,
      status: 'accepted',
    }).populate('recipient', '-password');
    res.status(200).json({ success: true, friendRequests, acceptedRequests });
  } catch (error) {
    console.error('Error in getFriendRequests controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getSentRequests = async (req, res) => {
  try {
    let senderId = req.user._id;
    let sentRequests = await FriendRequest.find({
      sender: senderId,
      status: 'pending',
    }).populate('recipient', '-password');

    res.status(200).json({ success: true, sentRequests });
  } catch (error) {
    console.error('Error in getSentRequests controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

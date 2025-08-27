import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import {
  acceptFriendRequest,
  getFriendRequests,
  getFriends,
  getRecommendedUsers,
  getSentRequests,
  sendFriendRequest,
} from '../controllers/user.controllers.js';

let router = Router();

router.get('/', auth, getRecommendedUsers);
router.get('/friends', auth, getFriends);

router.post('/friend-request/:id', auth, sendFriendRequest);
router.post('/friend-request/:id/accept', auth, acceptFriendRequest);

router.get('/friend-requests', auth, getFriendRequests);
router.get('/sent-requests', auth, getSentRequests);

export default router;

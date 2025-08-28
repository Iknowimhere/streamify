import { Router } from 'express';
import { login, logout, onboarding, signup } from '../controllers/auth.controllers.js';
import { auth } from '../middlewares/auth.js';
let router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/onboard', auth, onboarding);

router.get('/me', auth, (req, res) => {
  res.json(req.user);
});

export default router;

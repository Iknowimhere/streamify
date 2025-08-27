import { Router } from 'express';
import { getStreamToken } from '../controllers/chat.controllers.js';
import { auth } from '../middlewares/auth.js';
let router = Router();

router.get('/token', auth, getStreamToken);

export default router;

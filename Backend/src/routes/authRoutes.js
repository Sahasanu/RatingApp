import express from 'express';
import { signup, login, updatePassword, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/update-password', protect, updatePassword);
router.get('/me', protect, getMe);

export default router;

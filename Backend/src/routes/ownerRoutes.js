import express from 'express';
import { getOwnerDashboard } from '../controllers/ownerController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { updateStoreEmail } from '../controllers/storeController.js';

const router = express.Router();

router.use(protect);
router.use(authorize('STORE_OWNER'));

router.get('/dashboard', getOwnerDashboard);
router.put('/store/email',updateStoreEmail)

export default router;

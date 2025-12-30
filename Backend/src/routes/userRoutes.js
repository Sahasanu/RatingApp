import express from 'express';
import { getAllStores } from '../controllers/storeController.js';
import { addRating, updateRating } from '../controllers/ratingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/stores', getAllStores);
// router.get('/stores/:id', getStoreById);

router.post('/ratings', addRating);
router.put('/ratings', updateRating);

export default router;

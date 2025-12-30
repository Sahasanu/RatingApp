import Rating from '../models/Rating.js';
import Store from '../models/Store.js';

const updateStoreAverageRating = async (storeId) => {
    const ratings = await Rating.findAll({ where: { storeId } });
    if (ratings.length === 0) {
        await Store.update({ rating: 0 }, { where: { id: storeId } });
        return;
    }

    const sum = ratings.reduce((acc, r) => acc + r.score, 0);
    const avg = sum / ratings.length;

    await Store.update({ rating: avg }, { where: { id: storeId } });
};

// @desc    Submit a rating
// @route   POST /api/ratings
// @access  Private (Normal User)
const addRating = async (req, res) => {
    const { storeId, score } = req.body;

    if (score < 1 || score > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    try {
        const existingRating = await Rating.findOne({
            where: {
                userId: req.user.id,
                storeId,
            },
        });

        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this store. Use modify instead.' });
        }

        const rating = await Rating.create({
            userId: req.user.id,
            storeId,
            score,
        });

        await updateStoreAverageRating(storeId);

        res.status(201).json(rating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Modify a rating
// @route   PUT /api/ratings
// @access  Private (Normal User)
const updateRating = async (req, res) => {
    const { storeId, score } = req.body;

    if (score < 1 || score > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    try {
        const rating = await Rating.findOne({
            where: {
                userId: req.user.id,
                storeId,
            },
        });

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        rating.score = score;
        await rating.save();

        await updateStoreAverageRating(storeId);

        res.json(rating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addRating, updateRating };

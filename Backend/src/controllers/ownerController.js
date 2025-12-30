import Store from '../models/Store.js';
import Rating from '../models/Rating.js';
import User from '../models/User.js';
import { fn, col } from 'sequelize';

const getOwnerDashboard = async (req, res) => {
    try {
        const store = await Store.findOne({
            where: { ownerId: req.user.id }
        });

        if (!store) {
            return res.status(404).json({
                message: 'No store linked to this store owner account.'
            });
        }

        const ratings = await Rating.findAll({
            where: { storeId: store.id },
            include: [
                {
                    model: User,
                    attributes: ['name', 'email', 'address']
                }
            ]
        });

        const avgResult = await Rating.findOne({
            where: { storeId: store.id },
            attributes: [[fn('AVG', col('score')), 'averageRating']],
            raw: true
        });

        res.json({
            store,
            ratings,
            averageRating: Number(avgResult.averageRating || 0).toFixed(1)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getOwnerDashboard };

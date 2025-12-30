import Store from '../models/Store.js';
import Rating from '../models/Rating.js';
import { Op, fn, col, literal } from 'sequelize';

// @desc    Get all stores (paginated + search)
// @route   GET /user/stores
// @access  Private
const getAllStores = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { search } = req.query;

        const where = {};
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { address: { [Op.like]: `%${search}%` } }
            ];
        }


        const total = await Store.count({ where });


        const stores = await Store.findAll({
            where,
            limit,
            offset,
            subQuery: false,
            attributes: {
                include: [
                    // Average rating
                    [fn('ROUND', fn('AVG', col('Ratings.score')), 1), 'avgRating'],
                    // Current user's rating
                    [
                        fn(
                            'MAX',
                            literal(`CASE WHEN Ratings.userId = ${req.user.id} THEN Ratings.score END`)
                        ),
                        'userRating'
                    ]
                ]
            },
            include: [
                {
                    model: Rating,
                    attributes: [],
                    required: false
                }
            ],
            group: ['Store.id'],
            order: [['name', 'ASC']]
        });

        res.json({
            data: stores,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch stores' });
    }
};
// @desc    Update store email (Store Owner only)
// @route   PUT /api/owner/store/email
// @access  Private (Store Owner)
const updateStoreEmail = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Store email is required' });
        }

        const store = await Store.findOne({
            where: { ownerId: req.user.id }
        });

        if (!store) {
            return res.status(404).json({
                message: 'No store linked to this owner'
            });
        }

        store.email = email;
        await store.save();

        res.json({
            message: 'Store email updated successfully',
            store
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllStores, updateStoreEmail };

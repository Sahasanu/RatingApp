import User from '../models/User.js';
import Store from '../models/Store.js';
import Rating from '../models/Rating.js';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

// @desc    Add a new store (Owner mandatory)
// @route   POST /api/admin/stores
// @access  Private/Admin
import sequelize from '../config/db.js';

// @desc    Add a new store (Owner mandatory)
// @route   POST /api/admin/stores
// @access  Private/Admin
const addStore = async (req, res) => {
    const { name, address, ownerId } = req.body;

    try {
        if (!ownerId) {
            return res.status(400).json({
                message: 'Store owner is required'
            });
        }

        // Check owner
        const owner = await User.findByPk(ownerId, {
            include: Store
        });

        if (!owner || owner.role !== 'STORE_OWNER') {
            return res.status(400).json({
                message: 'Invalid store owner'
            });
        }

        // Enforce ONE owner : ONE store
        if (owner.Store) {
            return res.status(400).json({
                message: 'This store owner already has a store'
            });
        }

        const store = await Store.create({
            name,
            address,
            ownerId
        });

        res.status(201).json(store);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// @desc    Add a new user (Normal / Admin / Store Owner)
// @route   POST /api/admin/users
// @access  Private/Admin
const addUser = async (req, res) => {
    const {
        name,
        email,
        password,
        address,
        role,
        storeName,
        storeAddress
    } = req.body;

    const t = await sequelize.transaction();

    try {
        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,16})/;
        if (!passwordRegex.test(password)) {
            await t.rollback();
            return res.status(400).json({
                message:
                    'Password must be 8-16 characters, include at least one uppercase letter and one special character.'
            });
        }

        // Store validation (Fail fast)
        if (role === 'STORE_OWNER') {
            if (!storeName || !storeAddress) {
                await t.rollback();
                return res.status(400).json({
                    message: 'Store name and address are required for Store Owner'
                });
            }
        }

        // Prevent duplicate email
        const existingUser = await User.findOne({ where: { email }, transaction: t });
        if (existingUser) {
            await t.rollback();
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 1️⃣ Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role
        }, { transaction: t });

        // 2️⃣ If Store Owner → Store is mandatory
        if (role === 'STORE_OWNER') {
            await Store.create({
                name: storeName,
                address: storeAddress,
                ownerId: user.id
            }, { transaction: t });
        }

        await t.commit();

        // Fetch finalized user with store data if needed, or just return basic info
        const userResponse = { ...user.toJSON() };
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        await t.rollback();
        res.status(400).json({ message: error.message });
    }
};



// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.count();
        const storeCount = await Store.count();
        const ratingCount = await Rating.count();

        res.json({
            totalUsers: userCount,
            totalStores: storeCount,
            totalRatings: ratingCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users (with filters)
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const { name, email, address, role, sortBy, order } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    if (role && role !== 'All Roles') where.role = role;

    const orderClause = [];
    if (sortBy) {
        orderClause.push([sortBy, order === 'desc' ? 'DESC' : 'ASC']);
    }

    try {
        const users = await User.findAll({
            where,
            order: orderClause,
            attributes: { exclude: ['password'] },
            include: [{
                model: Store,
                attributes: ['name', 'rating'],
                required: false // LEFT JOIN, so normal users (without store) are still returned
            }]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all stores
// @route   GET /api/admin/stores
// @access  Private/Admin
const getStores = async (req, res) => {
    const { sortBy, order } = req.query;
    const orderClause = [];
    if (sortBy) {
        orderClause.push([sortBy, order === 'desc' ? 'DESC' : 'ASC']);
    }
    try {
        const stores = await Store.findAll({
            order: orderClause,
        });
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    addStore,
    addUser,
    getDashboardStats,
    getUsers,
    getStores,
};

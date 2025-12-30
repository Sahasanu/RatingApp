import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Store = sequelize.define(
    'Store',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },

        address: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },

        // 🔑 FOREIGN KEY (CRITICAL)
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, // ONE OWNER → ONE STORE
        },

        // (Optional legacy field)
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default Store;

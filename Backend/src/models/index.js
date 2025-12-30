import sequelize from "../config/db.js";

import User from "./User.js";
import Store from "./Store.js";
import Rating from "./Rating.js";

User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

Store.hasMany(Rating, { foreignKey: "storeId" });
Rating.belongsTo(Store, { foreignKey: "storeId" });

User.hasOne(Store, {
    foreignKey: "ownerId",
    onDelete: "RESTRICT",
});

Store.belongsTo(User, {
    foreignKey: "ownerId",
});

export { sequelize, User, Store, Rating };


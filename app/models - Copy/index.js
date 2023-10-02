const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.model.js")(sequelize, Sequelize);
db.Role = require("../models/role.model.js")(sequelize, Sequelize);
// db.OrderDetails = require("../models/order-details.model.js")(sequelize, Sequelize);
// db.OrderItems = require("../models/order-items.model.js")(sequelize, Sequelize);
// db.PaymentDetails = require("../models/payment-details.model.js")(sequelize, Sequelize);
// db.Product = require("../models/product.model.js")(sequelize, Sequelize);
// db.Discount = require("../models/discount.model.js")(sequelize, Sequelize);
// db.CartItem = require("../models/cart-item.model.js")(sequelize, Sequelize);
// db.ShoppingSession = require("../models/shopping-session.model.js")(sequelize, Sequelize);

// Define associations here
db.Role.belongsToMany(db.User, {
    through: "user_roles",
});
db.User.belongsToMany(db.Role, {
    through: "user_roles",
});
// db.OrderDetails.belongsTo(db.User, {
//     foreignKey: "OrderUserID",
//     as: "user",
// });
// db.User.hasMany(db.OrderDetails, {
//     foreignKey: "OrderUserID",
//     as: "order_details",
// });
// db.OrderDetails.hasMany(db.OrderItems, {
//     as: "order_items",
// });
// db.OrderDetails.hasOne(db.PaymentDetails, {
//     foreignKey: "order_id",
//     as: "payment_details",
// });
// db.OrderItems.belongsTo(db.Product, {
//     foreignKey: "product_id",
//     as: "product",
// });
// db.Product.hasMany(db.OrderItems, {
//     as: "order_items",
// });
// db.Product.belongsTo(db.Discount, {
//     foreignKey: "discount_id",
//     as: "discount",
// });
// db.Discount.hasMany(db.Product, {
//     as: "products",
// });
// db.CartItem.belongsTo(db.Product, {
//     foreignKey: "product_id",
//     as: "product",
// });
// db.Product.hasOne(db.CartItem, {
//     foreignKey: "product_id",
//     as: "cart_item",
// });
// db.ShoppingSession.belongsTo(db.User, {
//     foreignKey: "user_id",
//     as: "user",
// });
// db.User.hasOne(db.ShoppingSession, {
//     foreignKey: "user_id",
//     as: "shopping_session",
// });
// db.ShoppingSession.hasMany(db.CartItem, {
//     as: "cart_items",
// });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

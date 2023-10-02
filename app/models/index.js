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

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.order_detail = require("../models/order-details.model.js")(sequelize, Sequelize);
db.payment_details = require("../models/payment-details.model.js")(sequelize, Sequelize);
db.order_items = require("../models/order-items.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.discount = require("../models/discount.model.js")(sequelize, Sequelize);
db.cart_item = require("../models/cart-item.model.js")(sequelize, Sequelize);
db.shopping_session = require("../models/shopping-session.model")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.user.hasMany(db.order_detail, { foreignKey: 'user_id' });
db.order_detail.belongsTo(db.user, { foreignKey: 'user_id' });

db.payment_details.hasOne(db.order_detail, { foreignKey: 'payment_id' });
db.order_detail.belongsTo(db.payment_details, { foreignKey: 'payment_id' });

db.order_items.belongsTo(db.order_detail, { foreignKey: 'order_id' });
db.order_detail.hasMany(db.order_items, { foreignKey: 'order_id' });

db.product.hasOne(db.order_items, { foreignKey: 'product_id' });
db.order_items.belongsTo(db.product, { foreignKey: 'product_id' });

db.discount.hasMany(db.product, { foreignKey: 'discount_id' });
db.product.belongsTo(db.discount, { foreignKey: 'discount_id' });

db.product.hasOne(db.cart_item, { foreignKey: 'product_id' });
db.cart_item.belongsTo(db.product, { foreignKey: 'product_id' });

db.user.hasOne(db.shopping_session, { foreignKey: 'user_id' });
db.shopping_session.belongsTo(db.user, { foreignKey: 'user_id' });

db.shopping_session.hasMany(db.cart_item, { foreignKey: 'session_id' });
db.cart_item.belongsTo(db.shopping_session, { foreignKey: 'session_id' });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
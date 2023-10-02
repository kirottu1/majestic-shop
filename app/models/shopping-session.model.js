module.exports = (sequelize, Sequelize) => {
    const ShoppingSession = sequelize.define("shopping_session", {
        user_id: {
            type: Sequelize.INTEGER,
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
        },
    });

    // ShoppingSession.associate = (models) => {
    //     ShoppingSession.belongsTo(models.User, {
    //         foreignKey: "user_id",
    //         as: "user",
    //     });
    //     ShoppingSession.hasMany(models.CartItem, {
    //         as: "cart_items",
    //     });
    // };

    return ShoppingSession;
};

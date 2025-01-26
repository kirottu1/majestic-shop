module.exports = (sequelize, Sequelize) => {
    const ShoppingSession = sequelize.define("shopping_session", {
        user_id: {
            type: Sequelize.INTEGER,
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
        },
    });

    return ShoppingSession;
};

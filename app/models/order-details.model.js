module.exports = (sequelize, Sequelize) => {
    const OrderDetails = sequelize.define("order_details", {
        user_id: {
            type: Sequelize.INTEGER,
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        payment_id: {
            type: Sequelize.INTEGER,
        },
    });

    return OrderDetails;
};
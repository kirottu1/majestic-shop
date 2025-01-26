module.exports = (sequelize, Sequelize) => {
    const OrderItems = sequelize.define("order_items", {
        order_id: {
            type: Sequelize.INTEGER,
        },
        product_id: {
            type: Sequelize.INTEGER,
        },
    });

    return OrderItems;
};

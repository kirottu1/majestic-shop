module.exports = (sequelize, Sequelize) => {
    const OrderItems = sequelize.define("order_items", {
        order_id: {
            type: Sequelize.INTEGER,
        },
        product_id: {
            type: Sequelize.INTEGER,
        },
    });

    // OrderItems.associate = (models) => {
    //     OrderItems.belongsTo(models.OrderDetails, {
    //         foreignKey: "order_id",
    //         as: "order_details",
    //     });
    //     OrderItems.belongsTo(models.Product, {
    //         foreignKey: "product_id",
    //         as: "product",
    //     });
    // };

    return OrderItems;
};

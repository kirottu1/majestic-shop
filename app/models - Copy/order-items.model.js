module.exports = (sequelize, Sequelize) => {
    const OrderItems = sequelize.define("order_items", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        order_id: {
            type: Sequelize.INTEGER,
        },
        product_id: {
            type: Sequelize.INTEGER,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        modified_at: {
            type: Sequelize.DATE,
            allowNull: false,
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

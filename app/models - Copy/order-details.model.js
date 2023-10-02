module.exports = (sequelize, Sequelize) => {
    const OrderDetails = sequelize.define("order_details", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        OrderUserID: {
            type: Sequelize.INTEGER,
        },
        OrderTotal: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        OrderPaymentID: {
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
        // Add other attributes here
    });

    // OrderDetails.associate = (models) => {
    //     OrderDetails.belongsTo(models.User, {
    //         foreignKey: "OrderUserID",
    //         as: "user",
    //     });
    //     OrderDetails.hasMany(models.OrderItems, {
    //         as: "order_items",
    //     });
    //     OrderDetails.hasOne(models.PaymentDetails, {
    //         foreignKey: "order_id",
    //         as: "payment_details",
    //     });
    //     // Define other associations here
    // };

    return OrderDetails;
};
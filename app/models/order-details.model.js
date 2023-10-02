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
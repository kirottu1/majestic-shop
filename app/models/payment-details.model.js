module.exports = (sequelize, Sequelize) => {
    const PaymentDetails = sequelize.define("payment_details", {
        order_id: {
            type: Sequelize.INTEGER,
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
        },
    });
    //
    // PaymentDetails.associate = (models) => {
    //     PaymentDetails.belongsTo(models.OrderDetails, {
    //         foreignKey: "id",
    //         as: "order_details",
    //     });
    // };

    return PaymentDetails;
};

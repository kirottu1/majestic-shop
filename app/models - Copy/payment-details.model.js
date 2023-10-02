module.exports = (sequelize, Sequelize) => {
    const PaymentDetails = sequelize.define("payment_details", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        order_id: {
            type: Sequelize.INTEGER,
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        provider: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
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
    //
    // PaymentDetails.associate = (models) => {
    //     PaymentDetails.belongsTo(models.OrderDetails, {
    //         foreignKey: "id",
    //         as: "order_details",
    //     });
    // };

    return PaymentDetails;
};

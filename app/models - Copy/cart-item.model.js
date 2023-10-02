module.exports = (sequelize, Sequelize) => {
    const CartItem = sequelize.define("cart_item", {
        product_id: {
            type: Sequelize.STRING,
        },
        session_id: {
            type: Sequelize.STRING,
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
    });

    // CartItem.associate = (models) => {
    //     CartItem.belongsTo(models.Product, {
    //         foreignKey: "product_id",
    //         as: "product",
    //     });
    // };

    return CartItem;
};

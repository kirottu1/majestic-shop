module.exports = (sequelize, Sequelize) => {
    const CartItem = sequelize.define("cart_item", {
        product_id: {
            type: Sequelize.INTEGER,
        },
        session_id: {
            type: Sequelize.INTEGER,
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
    });

    return CartItem;
};

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        desc: {
            type: Sequelize.STRING,
        },
        brand: {
            type: Sequelize.STRING,
        },
        model: {
            type: Sequelize.STRING,
        },
        category: {
            type: Sequelize.STRING,
        },
        size: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
        },
        discount_id: {
            type: Sequelize.INTEGER,
        },
    });

    return Product;
};

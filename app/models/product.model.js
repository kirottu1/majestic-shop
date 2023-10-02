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

    // Product.associate = (models) => {
    //     Product.hasMany(models.OrderItems, {
    //         as: "order_items",
    //     });
    //     Product.belongsTo(models.Discount, {
    //         foreignKey: "discount_id",
    //         as: "discount",
    //     });
    // };

    return Product;
};

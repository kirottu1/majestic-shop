module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
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
        price: {
            type: Sequelize.DECIMAL(10, 2),
        },
        discount_id: {
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

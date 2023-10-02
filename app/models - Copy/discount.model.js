module.exports = (sequelize, Sequelize) => {
    const Discount = sequelize.define("discount", {
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
        discount_percent: {
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

    // Discount.associate = (models) => {
    //     Discount.hasMany(models.Product, {
    //         as: "products",
    //     });
    // };

    return Discount;
};

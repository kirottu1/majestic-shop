const SELECTOR = Object.freeze({
    TABLE: '.card-columns',
    TEMPLATE: '#card-template',
    BRAND_CHECKBOXES: "input[name='brand']",
    MODEL_CHECKBOXES: "input[name='model']",
});

const shoeStockTable = document.querySelector(SELECTOR.TABLE);
const cardTemplate = document.querySelector(SELECTOR.TEMPLATE).innerHTML;

function init() {
    API.getList()
        .then((res) => {
            adjustPosts(res);
            initializeFiltering();
            initialiseLinks();
        });
}

init();

function adjustPosts(post) {
    const adjustedPost = post.map((el) => getPostHTML(el)).join('');
    shoeStockTable.innerHTML = adjustedPost;
}

function getPostHTML(data) {
    const modelRegex = /{{model}}/g;
    const priceRegex = /{{price}}/g;
    const idRegex = /{{id}}/g;
    return cardTemplate
        .replace(modelRegex, data.model)
        .replace(priceRegex, data.price)
        .replace(idRegex, data.id)
        .replace('{{design}}', data.design)
        .replace('{{image}}', data.image)
        .replace('{{link}}', data.link)
        .replace('{{brand}}', data.brand);
}
//

function initializeFiltering() {
    const brandCheckboxes = document.querySelectorAll(SELECTOR.BRAND_CHECKBOXES);
    const modelCheckboxes = document.querySelectorAll(SELECTOR.MODEL_CHECKBOXES);

    function updateModelsVisibility() {
        const selectedBrands = Array.from(brandCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);

        const selectedModels = Array.from(modelCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.getAttribute('data-model'));

        const divs = document.querySelectorAll('.filterDiv');

        divs.forEach((div) => {
            const brand = div.getAttribute('data-brand');
            const model = div.getAttribute('data-model');

            const brandIncluded = selectedBrands.length === 0 || selectedBrands.includes(brand);
            const modelIncluded = selectedModels.length === 0 || selectedModels.includes(model);

            if (brandIncluded && modelIncluded) {
                div.style.display = 'inline-block';
            } else {
                div.style.display = 'none';
            }
        });

        // Disable brand checkboxes for other models
        brandCheckboxes.forEach((checkbox) => {
            const brand = checkbox.id;
            if (!selectedModels.includes(brand)) {
                checkbox.disabled = selectedModels.length > 0;
            } else {
                checkbox.disabled = false;
            }
        });

        // Disable model checkboxes for other brands
        modelCheckboxes.forEach((checkbox) => {
            const modelBrand = checkbox.getAttribute('data-brand');
            if (!selectedBrands.includes(modelBrand)) {
                checkbox.disabled = selectedBrands.length > 0;
            } else {
                checkbox.disabled = false;
            }
        });
    }

    brandCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateModelsVisibility);
    });

    modelCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateModelsVisibility);
    });

    updateModelsVisibility();
}

function initialiseLinks(){
    const cardLinks = document.querySelectorAll(".card-details-link");

    cardLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent the default link behavior

            // Get the data-id attribute of the clicked card
            const itemId = link.closest(".card").getAttribute("data-id");

            // Construct the URL for the item detail page (e.g., item.ejs)
            const itemDetailUrl = `/item/${itemId}`;

            // Redirect to the item detail page
            window.location.href = itemDetailUrl;
        });
    });
}

///
const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

// const db = {};
//
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
//
// db.User = require("../models/user.model.js")(sequelize, Sequelize);
// db.Role = require("../models/role.model.js")(sequelize, Sequelize);
// db.OrderDetails = require("../models/order-details.model.js")(sequelize, Sequelize);
// db.OrderItems = require("../models/order-items.model.js")(sequelize, Sequelize);
// db.PaymentDetails = require("../models/payment-details.model.js")(sequelize, Sequelize);
// db.Product = require("../models/product.model.js")(sequelize, Sequelize);
// db.Discount = require("../models/discount.model.js")(sequelize, Sequelize);
// db.CartItem = require("../models/cart-item.model.js")(sequelize, Sequelize);
// db.ShoppingSession = require("../models/shopping-session.model.js")(sequelize, Sequelize);
//
// // Define associations here
// db.Role.belongsToMany(db.User, {
//     through: "user_roles",
// });
// db.User.belongsToMany(db.Role, {
//     through: "user_roles",
// });
// db.OrderDetails.belongsTo(db.User, {
//     foreignKey: "OrderUserID",
//     as: "user",
// });
// db.User.hasMany(db.OrderDetails, {
//     foreignKey: "OrderUserID",
//     as: "order_details",
// });
// db.OrderDetails.hasMany(db.OrderItems, {
//     as: "order_items",
// });
// db.OrderDetails.hasOne(db.PaymentDetails, {
//     foreignKey: "order_id",
//     as: "payment_details",
// });
// db.OrderItems.belongsTo(db.Product, {
//     foreignKey: "product_id",
//     as: "product",
// });
// db.Product.hasMany(db.OrderItems, {
//     as: "order_items",
// });
// db.Product.belongsTo(db.Discount, {
//     foreignKey: "discount_id",
//     as: "discount",
// });
// db.Discount.hasMany(db.Product, {
//     as: "products",
// });
// db.CartItem.belongsTo(db.Product, {
//     foreignKey: "product_id",
//     as: "product",
// });
// db.Product.hasOne(db.CartItem, {
//     foreignKey: "product_id",
//     as: "cart_item",
// });
// db.ShoppingSession.belongsTo(db.User, {
//     foreignKey: "user_id",
//     as: "user",
// });
// db.User.hasOne(db.ShoppingSession, {
//     foreignKey: "user_id",
//     as: "shopping_session",
// });
// db.ShoppingSession.hasMany(db.CartItem, {
//     as: "cart_items",
// });
//
// db.ROLES = ["user", "admin", "moderator"];
//
// module.exports = db;

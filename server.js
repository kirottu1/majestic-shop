const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const axios = require('axios');
const app = express();

app.use(cors());

app.use(express.json());

app.use(
    cookieSession({
        name: "Cyril-coursework",
        keys: ["COOKIE_SECRET"],
        httpOnly: true,
    })
);

const db = require("./app/models");
const Role = db.role;
const CartItem = db.cart_item;


db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname)));

app.get('/item/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log(itemId)

        const response = await axios.get(`http://localhost:3000/stock?id=${itemId}`);

        const item = response.data[0];

        console.log(item)
        console.log(item.id)

        res.render('item', { item });
    } catch (error) {
        console.error('Error fetching item data:', error);

        res.status(500).send('Internal Server Error');
    }
});

app.post('/add-to-cart', async (req, res) => {
    const { product_id, quantity } = req.body;
    const session_id = req.session.sessionId;
    console.log("Received request to add item to cart");
    console.log("Product ID:", product_id);
    console.log("Quantity:", quantity);
    console.log("Session ID:", session_id);
    try {
        const existingCartItem = await CartItem.findOne({
            where: {
                product_id,
                session_id,
            },
        });

        if (existingCartItem) {
            console.log("Found existing cart item:", existingCartItem.toJSON());
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            console.log("Updated existing cart item:", existingCartItem.toJSON());
        } else {
            const newCartItem = await CartItem.create({
                product_id: product_id,
                session_id: session_id,
                quantity: quantity,
            });
            console.log("Created new cart item:", newCartItem.toJSON());
        }

        return res.status(200).send({ message: "Item added to the cart successfully." });
    } catch (error) {
        console.error("Error creating CartItem:", error);
        return res.status(500).send({ message: error.message });
    }
});

app.get('/api/cart-items', (req, res) => {
    if (!req.session || !req.session.sessionId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    CartItem.findAll({
        where: {
            session_id: req.session.sessionId,
        },
        attributes: ['product_id', 'quantity'],
    })
        .then((cartItems) => {
            const productsData = cartItems.map((item) => {
                return {
                    product_id: item.product_id,
                    quantity: item.quantity,
                };
            });
            res.json({ productIds: productsData });

        })
        .catch((error) => {
            console.error('Error retrieving cart items:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

app.delete('/api/cart-items/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const session_id = req.session.sessionId;

        const cartItem = await CartItem.findOne({
            where: {
                product_id: productId,
                session_id: session_id,
            },
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        await cartItem.destroy();

        return res.status(200).json({ message: 'Cart item removed successfully.' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
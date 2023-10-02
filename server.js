const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const axios = require('axios');
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "kirottu-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true,
    })
);

const db = require("./app/models");
const Role = db.role;

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

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to kirottu application." });
});

app.get('/item/:id', async (req, res) => {
    try {
        const itemId = req.params.id; // Get the item ID from the URL

        // Make an HTTP GET request to fetch item data based on the itemId
        const response = await axios.get(`http://localhost:3000/stock?id=${itemId}`);
        // Extract the item data from the response
        const item = response.data[0];
        //
        console.log(item)
        console.log(item.id)
        // // Render the item.ejs view and pass the itemData to it
        res.render('item', { item });
    } catch (error) {
        // Handle any errors here
        console.error('Error fetching item data:', error);
        // You can also render an error page or redirect as needed
        res.status(500).send('Internal Server Error');
    }
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
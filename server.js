const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path'); // Add this line to use path module

app.use(express.json()); // Parse JSON request bodies

// Serve your HTML, CSS, and JavaScript files from the root folder
app.use(express.static(__dirname)); // Serve files from the root folder

// Handle user registration
app.post('/register', (req, res) => {
    const newUser = req.body; // Assuming your registration form sends a JSON request
    // Define the path to the db.json file
    const dbPath = path.join(__dirname, 'employees-server', 'db.json');

    // Load the existing database
    const db = JSON.parse(fs.readFileSync(dbPath));

    const existingUser = db.users.find((user) => user.email === newUser.email);

    if (existingUser) {
        // Email already exists; send an error response
        return res.status(400).json({ message: 'Email already registered. Please choose a different email.' });
    } else {
        // Email is unique; proceed with registration
        // Add the new user to the database
        db.users.push(newUser);

        // Update the db.json file with the new user data
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        // Respond with a success message
        res.json({ message: 'Registration successful' });
        console.log('New user registered:', newUser);
    }
});
// Handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body; // Get user input from request

    // Load the database
    const dbPath = path.join(__dirname, 'employees-server', 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath));

    // Find the user in the database
    const user = db.users.find((u) => u.email === email && u.password === password);

    if (user) {
        // User is authenticated, you can send a success message
        res.json({ message: 'Login successful' });
    } else {
        // User authentication failed, send an error message
        res.status(401).json({ message: 'Login failed. Please check your credentials.' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

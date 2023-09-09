const express = require('express');
const app = express();
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path'); // Add this line to use path module

app.use(express.json()); // Parse JSON request bodies

// Serve your HTML, CSS, and JavaScript files from the root folder
app.use(express.static(__dirname)); // Serve files from the root folder

// Handle user registration

app.post('/register', async (req, res) => {
    const newUser = req.body;

    // Generate a salt and hash the user's password
    try {
        const saltRounds = 10; // Adjust the number of rounds as needed for your application
        const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

        // Create a new user object with the hashed password
        const userWithHashedPassword = {
            ...newUser,
            password: hashedPassword,
        };

        // Define the path to the db.json file
        const dbPath = path.join(__dirname, 'employees-server', 'db.json');

        // Load the existing database
        const db = JSON.parse(fs.readFileSync(dbPath));

        // Check if the email already exists in the database
        const existingUser = db.users.find(user => user.email === newUser.email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Add the new user to the database
        db.users.push(userWithHashedPassword);

        // Update the db.json file with the new user data
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        // Respond with a success message
        res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

// Handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Define the path to the db.json file
    const dbPath = path.join(__dirname, 'employees-server', 'db.json');

    // Load the existing database
    const db = JSON.parse(fs.readFileSync(dbPath));

    // Find the user with the matching email
    const user = db.users.find(user => user.email === email);

    // If the user is not found, or the password doesn't match, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Login failed. Please check your credentials.' });
    }

    // Authentication successful, you can now create a session or JWT token for the user
    // Here, I'll simply respond with a success message
    res.json({ message: 'Login successful' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

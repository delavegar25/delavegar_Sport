// routes for user signup, login and email verification

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('./db'); // Postgres connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post('/api/signup', async(req,resp) => {
    try {
    const { firstName, lastName, email, password } = req.body;
    // check if user already exists in the database

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user data to database

    resp.json({message: "User signed up successfully"});
    } catch (error) {
       console.error("Signup error:", error);
       resp.status(500).json({ error: "Internal server error" });
    }
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
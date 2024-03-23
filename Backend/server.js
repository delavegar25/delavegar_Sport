// integrate the frontend and backend 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const { Pool } = require('pg');
const { database } = require('pg/lib/defaults');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


//Middleware
app.use(bodyParser.json());
app.use(cors());

// database
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env_DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME 
})


// signup route

app.post('/api/signup', async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const verificationCode = randomstring.generate({ length: 6, charset: 'numeric' });

        const result = await pool.query('INSERT INTO users (first_name, last_name, email, password, verification_code) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, email, password, verificationCode]); 
        
        // send verification email
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        await transporter.sendMail({
            from: `"WorthSport" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Email Verification',
            text: 'You are just one step away, Please enter this code to verify your email address: ${verificationCode}'
        });

        res.json({ message: 'User signed up successfully.'});
    } catch(error) {
        console.error('Signup failed:', error);
        res.status(500).json({ error: 'Signup failed. Please try again.'})
    }
});

// Email verification route
app.post('/api/verify-email', async(req, res) => {
    try {
        const { email, code } = req.body;

        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND verification_code = $2', [email, code]);

        if(result.rows.length === 1){
            await pool.query('UPDATE users SET is_verified = true WHERE email = $1', [email]);
            res.json({ message: 'Email verified successfully, Welcome to WorthSport!'});
        } else {
            res.status(400).json({ error: 'Invalid verification code.' });
        }
    } catch (error) {
        console.error('Email verification failed:', error);
        res.status(500).json({ error: 'Email verification failed. Please try again.'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// integrate the frontend and backend 


const express = import ('express');
const bodyParser = import ('body-parser');
const cors = import ('cors');
const nodemailer = import ('nodemailer');
const randomstring = import ('randomstring');
const mysql = import ('sql'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


//Middleware
app.use(bodyParser.json());
app.use(cors());


const { createPool } = require('mysql');

// database connection
const pool = createPool ({
    connectionLimit: 10, // maximum number of connections in the pool
    user: process.env.DB_USER, // MYSQL database username
    password: process.env_DB_PASSWORD, // MYSQL database password 
    host: process.env.DB_HOST, // MYSQL database host 
    port: process.env.DB_PORT,// MYSQL database port 
    database: process.env.DB_NAME  // MYSQL database name
})

pool.on('error', (error) => {
    console.error('MYSQL connection error:', error);
})

// signup route

app.post('/api/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const verificationCode = randomstring.generate({ length: 6, charset: 'numeric' });

    pool.query('INSERT INTO users (first_name, last_name, email, password, verification_code) VALUES (?, ?, ?, ?, ?)', 
    [firstName, lastName, email, password, verificationCode], 
    (error, results) => {
        if(error) {
            console.error('Signup failed:', error);
            res.status(500).json({ error: 'Signup failed. Please try again.' });
        } else {
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

            transporter.sendMail({
                from: `"WorthSport" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Email Verification',
                text: `You are just one step away, Please enter this code to verify your email address: ${verificationCode}`
            }, (error, info) => {
                if(error) {
                    if(error) {
                        console.error('Email sending failed:', error);
                        res.status(500).json({ error: 'Failed to send verification email. Please try again.' });
                    } else {
                        console.log('Email sent:', info.response);
                        res.json({ message: 'User signed up successfully. Verification email sent.' });
                    }
                }
            })
        }
    })
})

// email verification route 
app.post('/api/verify-email', (req, res) => {
    const { email, code } = req.body;

    pool.query('SELECT * FROM users WHERE email = ? AND verification_code = ?', [email, code], (error, results) => {
        if(error) {
            console.error('Email verification failed:', error);
            res.status(500).json({ error: 'Email verification failed. Please try again.' });
        } else if (results.length === 1) {
            pool.query('UPDATE users SET is_verified = true WHERE email = ?', [email], (error, results) => {
                if(error) {
                    console.error('Email verification failed:', error);
                    res.status(500).json({ error: 'Email verification failed. Please try again.' });
                } else {
                    res.json({ message: 'Email verified successfuly, Welcome to WorthSport!' });
                }
            });
        } else {
            res.status(400).json({ error: 'Invalid verification code.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

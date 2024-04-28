// integrate the frontend and backend 

const express = require('express');
const app = express();
//const app = express.Router();


//const bodyParser = import ('body-parser');
//const cookieParser =  require('cookie-parser');
const cors = require('cors');
const nodemailer = import ('nodemailer');
//const randomstring = import ('randomstring');
const mysql = import ('sql'); 
require('dotenv').config();

const port = process.env.PORT ;

//Middleware

app.use(express.json());
app.use(cors());
//app.use(cookieParser());


const { Client } = require('pg')
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.PSQL_NAME,
    port: process.env.PSQL_PORT,
})
client.connect( (e)=> {
    if (e){
        throw e;
    }
    console.log('connected to the Database')
});


/*

const { createPool } = require('mysql');
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

*/


app.get('/', (req, res) => {
    res.send()
})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    client.query(`SELECT * FROM users WHERE email = '${email}' AND password='${password}' AND is_verified=True;`, (error,result) => {
        if (error) {
            res.status(500).json({ error: 'Server error' })
        }
        else if (result.rowCount === 1) {
            console.log(`Welcome Mr ${email}, i guess you are turning ${password} tomorrow`)
            res.status(200);            
            return res.end()
        }
        else {
            res.status(401).json({ error: 'Login failed! Please try again.' })
        }
    });
});



// signup route

app.post('/api/signup', (req, res) => {
    
    const { firstName, lastName, email, password } = req.body;
    const verificationCode  = Math.random().toString().substring(2,8);
    
    client.query('TRUNCATE TABLE users RESTART IDENTITY;')
    console.log(`Welcome Mr ${firstName} ${lastName}, your code is ${verificationCode} `)
    client.query(`INSERT INTO users  (first_name, last_name, email, password, verification_code ) VALUES
     ('${firstName}', '${lastName}', '${email}', '${password}', '${verificationCode}')`,
    (error, results) => {
        if(error) {

            console.error('Signup failed:', error);
            res.status(500).json({ error: 'Signup failed! Please try again.' });
        } else {
            res.status(200)
            res.send({'message': 'User created successfully'})
            return res.end()
            /*
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
            */
        }
    })
})

// email verification route 
app.post('/api/verify', (req, res) => {
    const { email,  code } = req.body;
    
    client.query(`SELECT * FROM users WHERE email='${email}' AND verification_code='${code}';`, (error, results) => {
        if(error) {
            console.error('Email verification failed:', error);
            res.status(500).json({ error: 'Email verification failed. Please try again.' });
        } else if (results.rowCount === 1) {
            client.query(`UPDATE users SET is_verified = true WHERE email = '${email}';`, (error, results) => {
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

module.exports = app;

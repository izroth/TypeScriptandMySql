const singupdb = require('../db/db.ts');
const bcrypt = require('bcrypt');
const jsonwebtokenlogin = require('jsonwebtoken');
const dotenv = require('dotenv');
const { default: axios } = require('axios');
dotenv.config();
const saltRounds = 10;

const signup = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json('Incorrect form submission');
        }

        // Check if user already exists
        const userExists = await new Promise<boolean>((resolve, reject) => {
            singupdb.query(
                `SELECT * FROM signup WHERE email = ?`,
                [email],
                (err: any, results: any) => {
                    if (err) {
                        console.log(err);
                        return reject('Database error');
                    }
                    resolve(results.length > 0);
                }
            );
        });

        if (userExists) {
            return res.status(400).json('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Generate token
        const token = jsonwebtokenlogin.sign(
            {
                email: email
            },
            process.env.JWT_KEY,
            {
                expiresIn: '1h'
            }
        );
        console.log(`${token} is the token`);

        // Insert data into the signup table
        const insertUserQuery = `INSERT INTO signup (name, email, password, timestamp, jwt) VALUES (?,?,?,?,?)`;
        const insertResults = await new Promise<{ insertId: number }>((resolve, reject) => {
            singupdb.query(
                insertUserQuery,
                [name, email, hashedPassword, new Date(), token],
                (err: any, results: any) => {
                    if (err) {
                        console.log(err);
                        return reject('Database error');
                    }
                    
        //ping the user data to the discord server
    
        axios.post( process.env.DISCORD_WEBHOOK_URL, {
            content: `New user signed up: ${name} ${email}`
        })
            .then((res: any) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
            })
            .catch((error: any) => {
                console.error(error)
            })
            
                    resolve(results);
                }
            );
        });
       

        

        console.log('Data inserted into signup table');
        return res.status(200).json('Success');
    } catch (err) {
        console.log(err);
        return res.status(400).json('An error occurred');
    }
};

module.exports = signup;

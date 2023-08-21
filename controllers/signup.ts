const singupdb = require('../db/db.ts');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
dotenv.config();
const saltRounds = 10;

const signup = (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json('Incorrect form submission');
        }
        // Check if user already exists
        singupdb.query(
            `SELECT * FROM signup WHERE email = ?`,
            [email],
            (err: any, results: any) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json('Database error');
                } else {
                    if (results.length > 0) {
                        return res.status(400).json('User already exists');
                    } else {
                        // Hash password
                        bcrypt.hash(password, saltRounds, (hashErr: any, hash: any) => {
                            if (hashErr) {
                                console.log(hashErr);
                                return res.status(500).json('Hashing error');
                            } else {
                                // Insert data into the signup table
                                singupdb.query(
                                    `INSERT INTO signup (name, email, password, timestamp) VALUES (?,?,?,NOW())`,
                                    [name, email, hash],
                                    (insertErr: any, insertResults: any) => {
                                        if (insertErr) {
                                            console.log(insertErr);
                                            return res.status(500).json('Database error');
                                        } else {
                                            console.log('Data inserted into signup table');
                                            return res.status(200).json('Success');
                                        }
                                    }
                                );
                            }
                        });
                    }
                }
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(400).json('An error occurred');
    }
};

module.exports = signup;

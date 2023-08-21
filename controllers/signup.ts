const db = require('../db/db.ts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const saltRounds = 10;

const signup = (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err: any, hash: any) => {
        if (err) {
            console.log(err);
        }
        else {
            db.query(`INSERT INTO signup (name, email, password) VALUES ('${name}', '${email}', '${hash}')`, (err: any, results: any) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).send('User registered');
                }
            });
        }
    });
}
module.exports = signup;


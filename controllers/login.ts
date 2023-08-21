const logintable = require('../db/db');
const jsonwebtoken = require('jsonwebtoken');
const dbcrypt = require('bcrypt');

const login =async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any; }; }; }) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json('Incorrect form submission');
        }
        // check if user exists
        logintable.query(
            `SELECT * FROM login WHERE email = ?`,
            [email],
            (err: any, results: any) => { // Specify types for 'err' and 'results'
                if (err) {
                    console.log(err);
                    return res.status(500).json('Database error');
                } else {
                    if (results.length > 0) {
                        // compare password
                        dbcrypt.compare(password, results[0].password, (hashErr: any, hash: any) => {
                            if (hashErr) {
                                console.log(hashErr);
                                return res.status(500).json('Hashing error');
                            } else {
                                // generate token
                                const token = jsonwebtoken.sign(
                                    {
                                        email: results[0].email,
                                        id: results[0].id
                                    },
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: '1h'
                                    }
                                );
                                return res.status(200).json(token);
                            }
                        });
                    } else {
                        return res.status(400).json('User does not exist');
                    }
                }
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(400).json('An error occurred');
    }
}

module.exports = login;

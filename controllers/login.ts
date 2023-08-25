const usertable = require('../db/db');
const jsonwebtoken = require('jsonwebtoken');
const dbcrypt = require('bcrypt');

const login =async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any; }; }; }) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json('Incorrect form submission');
        }
        //chcek if user exists
        usertable.query(
            `SELECT * FROM signup WHERE email = ?`,
            [email],
            (err: any, results: any) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json('Database error');
                }
                if (results.length === 0) {
                    return res.status(400).json('User does not exist');
                }
                //check if password is correct
                dbcrypt.compare(password, results[0].password, (bcryptErr: any, bcryptResults: any) => {
                    if (bcryptErr) {
                        console.log(bcryptErr);
                        return res.status(500).json('Database error');
                    }
                    if (!bcryptResults) {
                        return res.status(400).json('Invalid credentials');
                    }
                    //recrate token
                    const token = jsonwebtoken.sign(
                        {
                            email: email
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    );
                    console.log(`${token} is the token`);
                    //update token in db
                    usertable.query(
                        `UPDATE signup SET jwt = ? WHERE email = ?`,
                        [token, email],
                        (updateErr: any, updateResults: any) => {
                            if (updateErr) {
                                console.log(updateErr);
                                return res.status(500).json('Database error');
                            }
                            console.log('Token updated in signup table');
                        }
                    );
                    return res.status(200).json(JSON.stringify({ message: 'Success', token: token }));
                });
            }
        );
        
    } catch (err) {
        console.log(err);
        return res.status(400).json('An error occurred');
    }
}

module.exports = login;

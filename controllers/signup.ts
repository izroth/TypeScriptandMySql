const singupdb = require('../db/db.ts');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
dotenv.config();
const saltRounds = 10;

const signup = (req: any, res: any) => {
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json('Incorrect form submission');
        }
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err: any, hash: any) => {
            if (err) {
                console.log(err);
            }
            else {
                singupdb.query(
                    `INSERT INTO signup (name, email, password, timestamp) VALUES (?,?,?,NOW())`,
                    [name, email, hash],
                    (err: any, results: any) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('Data inserted into signup table');
                        }
                    }
                );
            }
        }
        );
        res.status(200).json('success');


    }
    catch(err){
        console.log(err)
        res.status(400).message('An error occured')
    }
}
module.exports = signup;


const jwt = require('jsonwebtoken');
const database = require('../db/db');
const authenicateenv = require('dotenv');
require('dotenv').config();

const authenticate = (
  req: { headers: { authorization: string }; userData: any; Email?: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): any; new (): any };
    };
  },
  next: () => void
) => {
  try {
    const token = req.headers.authorization;


    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxha2hhbnNoYXJtYTg5MDJAZ21haWwuY29tIiwiaWF0IjoxNjkyODY0ODU0LCJleHAiOjE2OTI4Njg0NTR9.RQOCOS9xgTF0tQ_BFZ_U4mgv490CZBBBNf74sRIIzDQ
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if(!decoded){
        return res.status(401).json({
            message: 'Auth failed 1',
            });
    }

    req.userData = decoded;
    //find user using jwt
    database.query(
        `SELECT * FROM signup WHERE jwt = ?`,
        [token],
        (err: any, results: any) => {
            if (err) {
                console.log(err);
                return res.status(500).json({message:'Database error'});
            } else {
                if (results.length > 0) {
                    req.Email = results[0].email;
                    console.log(req.Email);
                }
            }
        }
    );
   
    req.Email = decoded.email;

    
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};

module.exports = authenticate;

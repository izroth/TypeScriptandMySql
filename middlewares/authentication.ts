//authenticates the user
const jwt = require('jsonwebtoken');
const authenicateenv = require('dotenv');
dotenv.config();
const authenticate = (req: { headers: { authorization: string; }; userData: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: () => void) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}
module.exports = authenticate;

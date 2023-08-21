const loginrouter = require('express');
const router1 = loginrouter.Router();
const logincontroller = require('../controllers/login');
router1.post('/login', logincontroller);
module.exports = router1;

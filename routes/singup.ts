const singuprouters = require('express');
const router = singuprouters.Router();
const signupcontroller = require('../controllers/signup');
router.post('/signup', signupcontroller);



module.exports = router;

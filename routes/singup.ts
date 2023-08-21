const expresrouters = require('express');
const router = expresrouters.Router();
const signupcontroller = require('../controllers/signup');
router.post('/signup', signup);



module.exports = router;

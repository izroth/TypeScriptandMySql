const singuprouters = require('express');
const router = singuprouters.Router();
const signupcontroller = require('../controllers/signup');
const croncontrollers = require('../cron/cron');
router.post('/signup', signupcontroller);
router.post('/cron', croncontrollers);



module.exports = router;

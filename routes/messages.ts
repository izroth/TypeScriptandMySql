const messageexpress = require('express');
const messagerouter = messageexpress.Router();

const messagecontroller = require('../controllers/messages');

messagerouter.post('/messages', messagecontroller);
module.exports = messagerouter;
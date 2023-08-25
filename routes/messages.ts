const messageexpress = require('express');
const messagerouter = messageexpress.Router();

const messagecontroller = require('../controllers/messages');
const attachmentcontroller = require('../controllers/attachments');

messagerouter.post('/messages', messagecontroller);
messagerouter.post('/attachments', attachmentcontroller);
module.exports = messagerouter;
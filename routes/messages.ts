const messageexpress = require('express');
const messagerouter = messageexpress.Router();

const messagecontroller = require('../controllers/messages');
const attachmentcontroller = require('../controllers/attachments');
const feedbackcontroller = require('../controllers/Feedback');  

messagerouter.post('/messages', messagecontroller);
messagerouter.post('/attachments', attachmentcontroller);
messagerouter.post('/feedback', feedbackcontroller);

module.exports = messagerouter;
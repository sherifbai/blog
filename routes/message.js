const { Router } = require('express');

const messageController = require('../controllers/message');
const isAuth = require('../middleware/isAuth');

const route = Router();

route.post('/create', isAuth, messageController.createMessage);
route.get('/', isAuth, messageController.getMessages);
route.get('/:id', isAuth, messageController.getMessage);
route.put('/update/:id', isAuth, messageController.updateMessage);
route.delete('/delete/:id', isAuth, messageController.deleteMessage);

module.exports = route;

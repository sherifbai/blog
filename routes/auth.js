const { Router } = require('express');

const authController = require('../controllers/auth');

const route = Router();

route.post('/register', authController.register);
route.get('/login', authController.login);

module.exports = route;


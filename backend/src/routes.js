const express = require('express');
const MenuController = require('./controllers/MenuController');
const LoginController = require('./controllers/LoginController');
const routes = express.Router();

routes.get('/menus', MenuController.index);
routes.post('/menus', MenuController.create);
routes.put('/menus/:id', MenuController.update);
routes.delete('/menus/:id', MenuController.delete);

routes.post('/login', LoginController.test);

module.exports = routes;
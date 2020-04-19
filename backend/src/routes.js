const express = require('express');

const MenuController = require('./controllers/MenuController');
const LoginController = require('./controllers/LoginController');
const NiveilAcessoController = require('./controllers/NivelAcessoController');
const routes = express.Router();



routes.get('/menus', MenuController.index);
routes.post('/menus', MenuController.validatefields, MenuController.create);
routes.put('/menus/:id', MenuController.update);
routes.delete('/menus/:id', MenuController.delete);

routes.get('/niveis', NiveilAcessoController.index);
routes.post('/niveis', NiveilAcessoController.create);
routes.put('/niveis/:id', NiveilAcessoController.update);
routes.delete('/niveis/:id', NiveilAcessoController.delete);

routes.post('/login', LoginController.test);

module.exports = routes;
const express = require('express');

const MenuController = require('./controllers/MenuController');
const LoginController = require('./controllers/LoginController');
const NiveilAcessoController = require('./controllers/NivelAcessoController');
const UsuarioController = require('./controllers/UsuarioController');
const AuthMiddleware = require('./middleware/AuthMiddleware')
const routes = express.Router();



routes.get('/menus', MenuController.index);
routes.post('/menus', MenuController.validatefields, MenuController.create);
routes.put('/menus/:id', MenuController.update);
routes.delete('/menus/:id', MenuController.delete);

routes.get('/niveis', NiveilAcessoController.index);
routes.post('/niveis', NiveilAcessoController.create);
routes.put('/niveis/:id', NiveilAcessoController.update);
routes.delete('/niveis/:id', NiveilAcessoController.delete); 

routes.get('/usuarios', AuthMiddleware.auth_index, UsuarioController.index);
routes.post('/usuarios', AuthMiddleware.auth_create, UsuarioController.create);
routes.put('/usuarios', AuthMiddleware.auth_update, UsuarioController.update);
routes.delete('/usuarios/:id', AuthMiddleware.auth_delete, UsuarioController.delete);

routes.post('/login', AuthMiddleware.auth_index, LoginController.test);

module.exports = routes;
const express = require('express');
const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.delete('/users/:id', UserController.delete);

routes.get('/sessions', SessionController.index);
routes.post('/sessions', SessionController.create);

module.exports = routes;
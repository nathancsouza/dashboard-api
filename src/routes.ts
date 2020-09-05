import express from 'express';

import UsersController from './controllers/UsersController';

const routes = express.Router();
const usersController = new UsersController();

routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);

export default routes;

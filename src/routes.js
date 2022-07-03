const express = require('express');

const routes = express.Router();

const authToken = require('./middlewares/authToken');
const loginValidation = require('./middlewares/loginMiddleware');
const userMiddleware = require('./middlewares/userMiddleware');

const login = require('./controller/login');
const user = require('./controller/user');

const voidFunc = (_req, _res, next) => { next(); };

// --------------------------- AUTH ------------------------- //

routes.route('/login')
  .post(loginValidation, login.makeLogin);

// ----------------------- USER ROUTES ----------------------- //

routes.route('/user')
  .get(authToken, user.getAllUsers)
  .post(userMiddleware.addUser, user.addUser);

routes.route('/user/:id')
  .get(voidFunc);

routes.route('/user/me')
  .delete(voidFunc);

// --------------- POST AND CATEGORY ROUTES ----------------- // 

routes.route('/categories')
  .get(voidFunc)
  .post(voidFunc);

routes.route('/post')
  .get(voidFunc)
  .post(voidFunc);

routes.route('/post/:id')
  .get(voidFunc)
  .put(voidFunc)
  .delete(voidFunc);

  module.exports = routes;
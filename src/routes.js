const express = require('express');

const routes = express.Router();

const loginValidation = require('./middlewares/loginMiddleware');

const login = require('./controller/login');

const voidFunc = (_req, _res, next) => { next(); };

// --------------------------- AUTH ------------------------- //

routes.route('/login')
  .post(loginValidation, login.makeLogin);

// ----------------------- USER ROUTES ----------------------- //

routes.route('/user')
  .get(voidFunc)
  .post(voidFunc);

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
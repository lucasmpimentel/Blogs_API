const express = require('express');

const routes = express.Router();

const authToken = require('./middlewares/authToken');
const loginValidation = require('./middlewares/loginMiddleware');
const userMiddleware = require('./middlewares/userMiddleware');
const categorieValidation = require('./middlewares/categoriesMiddleware');
const newPostValidation = require('./middlewares/postsMiddleware');

const login = require('./controller/login');
const user = require('./controller/user');
const category = require('./controller/category');
const post = require('./controller/post');

const voidFunc = (_req, _res, next) => { next(); };

// --------------------------- AUTH ------------------------- //

routes.route('/login')
  .post(loginValidation, login.makeLogin);

// ----------------------- USER ROUTES ----------------------- //

routes.route('/user')
  .get(authToken, user.getAllUsers)
  .post(userMiddleware.addUser, user.addUser);

routes.route('/user/:id')
  .get(authToken, user.getUserById);

routes.route('/user/me')
  .delete(voidFunc);

// --------------- POST AND CATEGORY ROUTES ----------------- // 

routes.route('/categories')
  .get(authToken, category.getAll)
  .post(authToken, categorieValidation, category.addCategory);

routes.route('/post')
  .get(authToken, voidFunc)
  .post(authToken, newPostValidation, post.addPost);

routes.route('/post/:id')
  .get(authToken, voidFunc)
  .put(authToken, voidFunc)
  .delete(authToken, voidFunc);

  module.exports = routes;
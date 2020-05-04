const express = require('express');
const app = express();
// middlewares
const mdAuth = require('../middleware/auth.middleware');

// controller
const userController = require('../controllers/user.controller');
app
  .route('/')
  .get(userController.getUsers)
  .post(mdAuth.verifyToken, userController.create);

app
  .route('/:id')
  .get(mdAuth.verifyToken, userController.getUser)
  .put(mdAuth.verifyToken, userController.update)
  .delete(mdAuth.verifyToken, userController.remove);

module.exports = app;

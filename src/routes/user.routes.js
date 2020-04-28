var express = require('express');
var app = express();
// middlewares
var mdAuth = require('../middleware/auth.middleware');

// controller
var userController = require('../controllers/user.controller');
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

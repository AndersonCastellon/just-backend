const express = require('express');
const app = express();
// middlewares
const mdAuth = require('../middleware/auth.middleware');

// controller
const userController = require('../controllers/user.controller');
app.route('/').get(userController.getUsers).post(userController.create);

app
  .route('/:id')
  .get(userController.getUser)
  .put(userController.update)
  .delete(userController.remove);

module.exports = app;

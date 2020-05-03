var express = require('express');
var app = express();

var loginController = require('../controllers/login.controller');

/**
 * Login
 */
app.route('/').post(loginController.loginWithEmail);
app.route('/google').post(loginController.loginWithGoogle);
module.exports = app;

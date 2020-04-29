var express = require('express');
var app = express();

var loginController = require('../controllers/login.controller');

/**
 * Login
 */
app.route('/').post(loginController.login);

module.exports = app;

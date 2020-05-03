const express = require('express');
const app = express();

const loginController = require('../controllers/login.controller');

/**
 * Login
 */
app.route('/').post(loginController.loginWithEmail);
app.route('/google').post(loginController.loginWithGoogle);
module.exports = app;

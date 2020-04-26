var express = require('express');
var bcript = require('bcryptjs');
var jwt = require('jsonwebtoken');

var app = express();

var User = require('../models/user.schema');

// Variables
var secretKey =
  '*ejPf8zcJKYoK7EV!Qm!Th%Ba$Qm#!m9BU5!*aMXSUkADu6Czh4Y$*j8@eY8ta#w9RbMXe%c9sqCca#$@AndAdTPjL2nVA^^p&rx8qh^DE*P#sJR4zQ#k2aHMg&tt$hi';

/**
 * Login user
 */
app.post('/', (req, res) => {
  //get body
  var body = req.body;

  // find user
  User.findOne({ email: body.email }, (error, user) => {
    //errors
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    // user not found
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad credentials - email',
        errors: error
      });
    }

    // password not match
    if (!bcript.compareSync(body.password, user.password)) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad credentials - password',
        errors: error
      });
    }

    // all god
    user.password = '';

    // generate jwt
    var token = jwt.sign({ user: user }, secretKey, { expiresIn: 14000 });

    res.status(200).json({
      status: 'ok',
      user: user,
      token: token
    });
  });
});

module.exports = app;

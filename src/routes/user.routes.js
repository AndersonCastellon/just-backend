var express = require('express');
var app = express();
var User = require('../models/user.schema');
/**
 * Get all users
 */
app.get('/', (req, res, next) => {
  User.find({}, 'name email photo role').exec((error, users) => {
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    res.status(200).json({
      status: 'Ok',
      users: users
    });
  });
});

/**
 * Create user
 */
app.post('/', (req, res) => {
  var body = req.body;

  var user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    photo: body.photo,
    role: body.role
  });

  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Create user error',
        errors: error
      });
    }

    res.status(200).json({
      status: 'Ok',
      user: user
    });
  });
});

module.exports = app;

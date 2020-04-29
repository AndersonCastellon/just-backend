var jwt = require('jsonwebtoken');
var User = require('../models/user.schema');
var bcript = require('bcryptjs');
var config = require('../config/config');

/**
 * Login
 */
function login(req, res) {
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
    var token = jwt.sign({ user: user }, config.secretKey, {
      expiresIn: 31536000
    });

    res.status(200).json({
      status: 'ok',
      user: user,
      token: token
    });
  });
}

module.exports = {
  login
};

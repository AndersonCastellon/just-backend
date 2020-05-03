var loginService = require('../services/login.service');
var userService = require('../services/user.service');

/**
 * Login
 */
function loginWithEmail(req, res) {
  //get body
  var body = req.body;

  loginService
    .loginWithEmail(body)
    .then((data) => {
      return res.status(200).json({
        status: 'ok',
        user: data.user,
        token: data.token
      });
    })
    .catch((error) => {
      return res.status(error.code).json({
        status: 'error',
        message: error.message || 'Server error',
        errors: error
      });
    });
}

function loginWithGoogle(req, res) {
  var gToken = req.body.gToken;

  loginService
    .loginWithGoogle(gToken)
    .then((body) => {
      userService.createWithGoogle(body).then((data) => {
        return res.status(200).json({
          status: 'ok',
          user: data.user,
          token: data.token
        });
      });
    })
    .catch((error) => {
      return res.status(403).json({
        status: 'error',
        message: 'Invalid gToken'
      });
    });
}

module.exports = {
  loginWithEmail,
  loginWithGoogle
};

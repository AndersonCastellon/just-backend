const loginService = require('../services/login.service');
const userService = require('../services/user.service');

/**
 * Login
 */
function loginWithEmail(req, res) {
  //get body
  const body = req.body;

  loginService
    .loginWithEmail(body)
    .then((data) => {
      return res.status(200).json({
        code: 200,
        user: data.user,
        token: data.token
      });
    })
    .catch((error) => {
      return res.status(error.code).json({ error });
    });
}

function loginWithGoogle(req, res) {
  const gToken = req.body.gToken;

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

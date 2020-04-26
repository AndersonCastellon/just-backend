var jwt = require('jsonwebtoken');
var secretkey = require('../config/config').secretKey;

exports.verifyToken = (req, res, next) => {
  var token = req.header('authorization');

  jwt.verify(token, secretkey, (error, decoded) => {
    if (error) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid token',
        errors: error
      });
    }
    req.authUser = decoded.user;
    next();
  });
};

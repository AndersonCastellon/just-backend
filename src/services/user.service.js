var User = require('../models/user.schema');

var jwt = require('jsonwebtoken');
var SECRET_KEY = require('../config/config').secretKey;

function createWithGoogle(body) {
  return new Promise((resolve, reject) => {
    User.findOne({ email: body.email }, (error, user) => {
      if (error) {
        reject(error);
      }

      if (!user) {
        const newUser = new User({
          name: body.name,
          email: body.email,
          photo: body.photo,
          google: true,
          password: '...'
        });

        newUser.save((error, user) => {
          if (error) reject(error);
          if (user) {
            // generate jwt
            const token = jwt.sign({ user: user }, SECRET_KEY, {
              expiresIn: 31536000
            });

            resolve({ user, token });
          }
        });
      } else {
        user.google = true;
        user.photo = body.photo;

        user.save((error, user) => {
          if (error) reject(error);
          // generate jwt
          const token = jwt.sign({ user: user }, SECRET_KEY, {
            expiresIn: 31536000
          });

          user.password = undefined;

          resolve({ user, token });
        });
      }
    });
  });
}

module.exports = {
  createWithGoogle
};

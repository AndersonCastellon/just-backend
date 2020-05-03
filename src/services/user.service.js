const User = require('../models/user.schema');

const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config').secretKey;

function getUsers(from, limit) {
  return new Promise((resolve, reject) => {
    User.find({}, 'name email photo role google')
      .skip(from)
      .limit(limit)
      .exec((error, users) => {
        if (error) {
          reject(error);
        }

        User.count({}, (error, count) => {
          if (error) reject(error);
          resolve({ count, users });
        });
      });
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    User.findById(id, 'name email photo role google', (error, user) => {
      // errors
      if (error) {
        reject({ code: 500, message: 'Server error' });
      }

      if (!user) {
        reject({ code: 404, message: 'User not exist' });
      }

      // all ok
      resolve(user);
    });
  });
}

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
  getUsers,
  getUser,
  createWithGoogle
};

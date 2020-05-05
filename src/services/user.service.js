const User = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const handler = require('../handlers/responses');
const messages = require('../config/messages');

const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config').secretKey;

function getUsers(from, limit) {
  return new Promise((resolve, reject) => {
    User.find({}, 'name email photo role google')
      .skip(from)
      .limit(limit)
      .exec((error, users) => {
        if (error) {
          reject(handler.errorResponse(500, messages.SERVER_ERROR, error));
        }

        if (users.length < 1) {
          reject(handler.errorResponse(404, messages.USERS_NOT_FOUND));
        }

        User.count({}, (error, count) => {
          if (error)
            reject(handler.errorResponse(400, messages.ERROR_COUNT_USERS));
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
        reject(handler.errorResponse(500, 'Server error', errors));
      } else if (!user) {
        reject(handler.errorResponse(404, 'User no exist'));
      } else {
        // all ok
        resolve(user);
      }
    });
  });
}

function create(body) {
  return new Promise((resolve, reject) => {
    const user = new User({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      photo: body.photo,
      role: body.role
    });

    user.save((error, user) => {
      if (error) {
        reject(
          handler.errorResponse(400, messages.USER_VALIDATION_FAILED, error)
        );
      } else {
        user.password = undefined;
        resolve(handler.entityResponse(201, user));
      }
    });
  });
}

function update(id, body) {
  return new Promise((resolve, reject) => {
    // find user
    User.findById(id, (error, user) => {
      // errors
      if (error) {
        reject(handler.errorResponse(500, messages.SERVER_ERROR, error));
      } else if (!user) {
        reject(handler.errorResponse(404, messages.USER_NOT_FOUND));
      }

      // user god
      user.name = body.name;
      user.email = body.email;
      user.role = body.role;

      user.save((error, user) => {
        // errors
        if (error) {
          reject(
            handler.errorResponse(400, messages.USER_UPDATE_FAILED, error)
          );
        } else if (!user) {
          reject(handler.errorResponse(404, messages.USER_NOT_FOUND));
        } else {
          user.password = undefined;
          resolve(handler.entityResponse(200, user));
        }
      });
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    // Detele user
    User.findByIdAndRemove(id, (error, user) => {
      // errors
      if (error) {
        reject(handler.errorResponse(500, messages.SERVER_ERROR, error));
      }

      // user not found
      if (!user) {
        reject(handler.errorResponse(404, messages.USER_NOT_FOUND));
      }

      resolve(handler.entityResponse(200, user));
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
  create,
  update,
  remove,
  createWithGoogle
};

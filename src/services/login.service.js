const jwt = require('jsonwebtoken');
const User = require('../models/user.schema');
const bcript = require('bcryptjs');
const SECRET_KEY = require('../config/config').SECRET_KEY;
const CLIENT_ID = require('../config/config').CLIENT_ID;

// Google
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

function loginWithEmail(body) {
  return new Promise((resolve, reject) => {
    User.findOne({ email: body.email }, (error, user) => {
      if (error) {
        reject({ code: 500, error });
      }

      if (!user) {
        reject({ code: 400, message: 'Bad credentials - email' });
      }

      // password not match
      if (!bcript.compareSync(body.password, user.password)) {
        reject({ code: 400, message: 'Bad credentials - password' });
      }

      // all god
      user.password = '';

      // generate jwt
      const token = jwt.sign({ user: user }, SECRET_KEY, {
        expiresIn: 31536000
      });

      resolve({ user, token });
    });
  });
}

async function loginWithGoogle(gToken) {
  const ticket = await client.verifyIdToken({
    idToken: gToken,
    audience: CLIENT_ID
  });

  const payload = ticket.getPayload();

  return {
    name: payload.name,
    email: payload.email,
    photo: payload.picture,
    google: true
  };
}

module.exports = {
  loginWithEmail,
  loginWithGoogle
};

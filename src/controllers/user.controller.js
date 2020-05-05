var User = require('../models/user.schema');

const userService = require('../services/user.service');

/**
 * Get all users
 */
function getUsers(req, res) {
  var limit = req.query.limit || 0;
  limit = Number(limit);

  var from = req.query.from || 0;
  from = Number(from);

  userService
    .getUsers(from, limit)
    .then((data) => {
      return res.status(200).json({
        status: 'Ok',
        data
      });
    })
    .catch((error) => {
      return res.status(error.code).json({
        error
      });
    });
}

/**
 * Get user
 */
function getUser(req, res) {
  var id = req.params.id;

  userService
    .getUser(id)
    .then((data) => {
      return res.status(200).json({
        status: 'ok',
        data
      });
    })
    .catch((error) => {
      return res.status(error.code).json({
        status: 'error',
        errors: error.message
      });
    });
}

/**
 * Create user
 */
function create(req, res) {
  const body = req.body;
  userService
    .create(body)
    .then((data) => {
      return res.status(data.code).json({ data });
    })
    .catch((error) => {
      return res.status(error.code).json({ error });
    });
}

/**
 * Update user
 */
function update(req, res) {
  // get id
  var id = req.params.id;
  // get body request
  var body = req.body;

  userService
    .update(id, body)
    .then((data) => {
      return res.status(data.code).json({ data });
    })
    .catch((error) => {
      return res.status(error.code).json({ error });
    });
}

/**
 * Delete user
 */
function remove(req, res) {
  // get id
  var id = req.params.id;

  userService
    .remove(id)
    .then((data) => res.status(data.code).json({ data }))
    .catch((error) => res.status(error.code).json({ error }));
}

module.exports = {
  getUser,
  getUsers,
  create,
  update,
  remove
};

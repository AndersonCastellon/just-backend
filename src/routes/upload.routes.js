var express = require('express');
var app = express();

var uploadController = require('../controllers/upload.controller');
var mdAuth = require('../middleware/auth.middleware');

app
  .route('/photo/:collection/:id')
  .put(mdAuth.verifyToken, uploadController.uploadPhoto);

module.exports = app;

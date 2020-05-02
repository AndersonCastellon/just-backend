var express = require('express');
var app = express();

var mdAuth = require('../middleware/auth.middleware');
var imageController = require('../controllers/image.controller');

app
  .route('/:collection/:filename')
  .get(mdAuth.verifyToken, imageController.getImage);

module.exports = app;

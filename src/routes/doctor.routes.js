var express = require('express');
var app = express();

var mdAuth = require('../middleware/auth.middleware');
var doctorController = require('../controllers/doctor.controller');

app
  .route('/')
  .get(doctorController.getDoctors)
  .post(mdAuth.verifyToken, doctorController.create);

app
  .route('/:id')
  .get(mdAuth.verifyToken, doctorController.getDoctor)
  .put(mdAuth.verifyToken, doctorController.update)
  .delete(mdAuth.verifyToken, doctorController.remove);

module.exports = app;

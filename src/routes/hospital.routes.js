var express = require('express');
var app = express();

var hospitalController = require('../controllers/hospital.controller');

var mdAuth = require('../middleware/auth.middleware');

app
  .route('/')
  .get(hospitalController.getHospitals)
  .post(mdAuth.verifyToken, hospitalController.create);
app
  .route('/:id')
  .get(mdAuth.verifyToken, hospitalController.getHospital)
  .put(mdAuth.verifyToken, hospitalController.update)
  .delete(mdAuth.verifyToken, hospitalController.remove);

module.exports = app;

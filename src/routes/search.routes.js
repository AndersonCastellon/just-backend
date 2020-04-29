var express = require('express');
var app = express();

var mdAuth = require('../middleware/auth.middleware');
var searchController = require('../controllers/search.controller');

app.route('/all').get(mdAuth.verifyToken, searchController.searchAll);
app.route('/users').get(mdAuth.verifyToken, searchController.searchUsers);
app
  .route('/hospitals')
  .get(mdAuth.verifyToken, searchController.searchHospitals);
app.route('/doctors').get(mdAuth.verifyToken, searchController.searchDoctors);

module.exports = app;

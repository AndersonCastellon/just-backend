var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Ok',
    message: 'Todo bien desde ExpressJs'
  });
});

module.exports = app;

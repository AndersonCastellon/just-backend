// Requeries
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();

// Conexión a la db
mongoose.connection.openUri(
  'mongodb://localhost:27017/hospitalDB',
  (error, res) => {
    if (error) throw error;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');
  }
);

// Rutas
app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'Ok',
    message: 'Todo bien desde ExpressJs'
  });
});

// Escuchar el servidor
app.listen(3000, () => {
  console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'Online');
});

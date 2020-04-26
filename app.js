// Requeries
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Body parser
app.use(bodyParser.json());

// Importar rutas
var appRoutes = require('./src/routes/app.routes');
var userRoutes = require('./src/routes/user.routes');
var loginRoutes = require('./src/routes/login.routes');

// Conexión a la db
mongoose.connection.openUri(
  'mongodb://localhost:27017/hospitalDB',
  (error, res) => {
    if (error) throw error;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');
  }
);

// Rutas
app.use('/', appRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

// Escuchar el servidor
app.listen(3000, () => {
  console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'Online');
});

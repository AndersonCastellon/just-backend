// Requeries
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Body parser
app.use(bodyParser.json());

// Importar rutas
var appRoutes = require('./routes/app.routes');
var userRoutes = require('./routes/user.routes');
var loginRoutes = require('./routes/login.routes');
var hospitalRoutes = require('./routes/hospital.routes');

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
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/hospitals', hospitalRoutes);

// Escuchar el servidor
app.listen(3000, () => {
  console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'Online');
});

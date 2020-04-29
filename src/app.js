// Requeries
var express = require('express');
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
var doctorRoutes = require('./routes/doctor.routes');
var searchRoutes = require('./routes/search.routes');

// Rutas
app.use('/', appRoutes);
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/doctors', doctorRoutes);
app.use('/search', searchRoutes);

module.exports = app;

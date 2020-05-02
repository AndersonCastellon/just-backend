// Requeries
var express = require('express');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

// Inicializar variables
var app = express();

// Body parser
app.use(bodyParser.json());

app.use(fileUpload());

// Importar rutas
var appRoute = require('./routes/app.routes');
var user = require('./routes/user.routes');
var login = require('./routes/login.routes');
var hospital = require('./routes/hospital.routes');
var doctor = require('./routes/doctor.routes');
var search = require('./routes/search.routes');
var upload = require('./routes/upload.routes');
var image = require('./routes/images.routes');

// Rutas
app.use('/', appRoute);
app.use('/login', login);
app.use('/users', user);
app.use('/hospitals', hospital);
app.use('/doctors', doctor);
app.use('/search', search);
app.use('/upload', upload);
app.use('/images', image);

module.exports = app;

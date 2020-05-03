// Requeries
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// Inicializar variables
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(fileUpload());

// Importar rutas
const user = require('./routes/user.routes');
const login = require('./routes/login.routes');
const upload = require('./routes/upload.routes');
const image = require('./routes/images.routes');

// Rutas
app.use('/login', login);
app.use('/users', user);
app.use('/upload', upload);
app.use('/images', image);

module.exports = app;

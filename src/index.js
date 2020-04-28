var mongoose = require('mongoose');
var app = require('./app');

var PORT = 3000;

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true })
  .then(() => {
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');

    app.listen(PORT, () => {
      console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'Online');
    });
  })
  .catch((error) => console.log(error));

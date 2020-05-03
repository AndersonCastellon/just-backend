const mongoose = require('mongoose');
const app = require('./app');

const PORT = 3000;
const DB = 'funding';
const URI = `mongodb://localhost:27017/${DB}`;

mongoose.Promise = global.Promise;

mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');

    app.listen(PORT, () => {
      console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'Online');
    });
  })
  .catch((error) => console.log(error));

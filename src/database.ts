import mongoose from 'mongoose';

const DB = 'funding';
const URI = `mongodb://localhost:27017/${DB}`;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');
  })
  .catch((error) => console.log(error));

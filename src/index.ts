import app from './app';
import './database';

const PORT = app.get('port');

app.listen(PORT, () => {
  console.log(
    'Express server puerto ' + PORT + ': \x1b[32m%s\x1b[0m',
    'Online'
  );
});

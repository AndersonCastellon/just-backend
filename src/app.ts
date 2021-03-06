import express, { Application } from 'express';
const app: Application = express();

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

const APP_VERSION = 'V1';

// Config
app.set('port', 3001);
dotenv.config();
// Middlewares
app.use(bodyParser.json());
app.use(fileUpload());

// Importar rutas
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Rutas
app.use(`/${APP_VERSION}/auth`, authRoutes);
app.use(`/${APP_VERSION}/users`, userRoutes);

export default app;

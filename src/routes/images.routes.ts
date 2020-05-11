import { Router } from 'express';
const router = Router();

import { verifyToken } from '../middleware/auth.middleware';

var imageController = require('../controllers/image.controller');

router
  .route('/:collection/:filename')
  .get(verifyToken, imageController.getImage);

export default router;

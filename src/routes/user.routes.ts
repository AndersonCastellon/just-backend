import { Router } from 'express';
const router = Router();
// middlewares
import { verifyToken } from '../middleware/auth.middleware';

// controller
import * as userController from '../controllers/user.controller';

router
  .route('/:id')
  .get(verifyToken, userController.getUser)
  .put(verifyToken, userController.update)
  .delete(verifyToken, userController.remove);

export default router;

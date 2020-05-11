import { Router } from 'express';
const router: Router = Router();

import {
  loginWithEmail,
  loginWithGoogle,
  signin
} from '../controllers/auth.controller';

/**
 * Login
 */
router.route('/signin').post(signin);
router.route('/login').post(loginWithEmail);
router.route('/login/google').post(loginWithGoogle);

export default router;

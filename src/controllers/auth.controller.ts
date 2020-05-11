import { Response, Request } from 'express';
import * as authS from '../services/auth.service';

/**
 * Login
 */

export const loginWithEmail = (req: Request, res: Response) => {
  //get body
  const body = req.body;

  authS
    .loginWithEmail(body)
    .then((data: any) => {
      return res.status(200).json({
        code: 200,
        user: data.user,
        token: data.token
      });
    })
    .catch((error: any) => {
      return res.status(error.code).json({ error });
    });
};

/**
 * Login google
 */

export const loginWithGoogle = (req: Request, res: Response) => {
  const gToken = req.body.gToken;

  authS
    .loginWithGoogle(gToken)
    .then((data: any) => {
      return res.status(200).json({
        code: 200,
        user: data.user,
        token: data.token
      });
    })
    .catch((error: any) => {
      return res.status(error.code || 403).json({
        error
      });
    });
};

/**
 * Signin
 */

export const signin = (req: Request, res: Response) => {
  const body: any = req.body;

  authS
    .signin(body)
    .then((data: any) => {
      return res.status(201).json({
        code: 201,
        user: data.user,
        token: data.token
      });
    })
    .catch((error) => {
      return res.status(error.code || 400).json({
        error
      });
    });
};

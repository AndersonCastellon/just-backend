import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY as string;

export const verifyToken = (
  req: JRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.header('authorization') as string;

  jwt.verify(token, SECRET_KEY, (error, decoded: any) => {
    if (error) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid token',
        errors: error
      });
    }
    req.authUser = decoded.user;
    next();
  });
};

export interface JRequest extends Request {
  authUser?: any;
}

import * as us from '../services/user.service';
import { Request, Response } from 'express';
/**
 * Get all users
 */
export const getUsers = (req: Request, res: Response) => {
  var limit = req.query.limit || 0;
  limit = Number(limit);

  var from = req.query.from || 0;
  from = Number(from);

  us.getUsers(from, limit)
    .then((data) => {
      return res.status(200).json({
        status: 'Ok',
        data
      });
    })
    .catch((error) => {
      return res.status(error.code).json({
        error
      });
    });
};

/**
 * Get user
 */
export const getUser = (req: Request, res: Response) => {
  var id = req.params.id;

  us.getUser(id)
    .then((data) => {
      return res.status(200).json({
        status: 'ok',
        data
      });
    })
    .catch((error) => {
      return res.status(error.code).json({
        status: 'error',
        errors: error.message
      });
    });
};

/**
 * Update user
 */
export const update = (req: Request, res: Response) => {
  // get id
  var id = req.params.id;
  // get body request
  var body = req.body;

  us.update(id, body)
    .then((data: any) => {
      return res.status(data.code).json({ data });
    })
    .catch((error) => {
      return res.status(error.code).json({ error });
    });
};

/**
 * Delete user
 */
export const remove = (req: Request, res: Response) => {
  // get id
  var id = req.params.id;

  us.remove(id)
    .then((data: any) => res.status(data.code).json({ data }))
    .catch((error) => res.status(error.code).json({ error }));
};

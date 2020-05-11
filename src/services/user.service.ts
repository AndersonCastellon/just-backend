import User, { IUser } from '../models/User/user.schema';
import { entityResponse, errorResponse } from '../handlers/responses';
import {
  SERVER_ERROR,
  USERS_NOT_FOUND,
  ERROR_COUNT_USERS,
  USER_NOT_FOUND,
  USER_UPDATE_FAILED
} from '../config/messages';

export const getUsers = (from: number, limit: number) => {
  return new Promise((resolve, reject) => {
    User.find({}, 'name email photo role google')
      .skip(from)
      .limit(limit)
      .exec((error, users) => {
        if (error) {
          reject(errorResponse(500, SERVER_ERROR, error));
        }

        if (users.length < 1) {
          reject(errorResponse(404, USERS_NOT_FOUND));
        }

        User.count({}, (error, count) => {
          if (error) reject(errorResponse(400, ERROR_COUNT_USERS));
          resolve({ count, users });
        });
      });
  });
};

export const getUser = (id: string) => {
  return new Promise((resolve, reject) => {
    User.findById(id, 'name email photo role google', (error, user) => {
      // errors
      if (error) {
        reject(errorResponse(500, 'Server error', error));
      } else if (!user) {
        reject(errorResponse(404, 'User no exist'));
      } else {
        // all ok
        resolve(user);
      }
    });
  });
};

export const update = (id: string, body: any) => {
  return new Promise((resolve, reject) => {
    // find user
    User.findById(id, (error, user: IUser) => {
      // errors
      if (error) {
        reject(errorResponse(500, SERVER_ERROR, error));
      } else if (!user) {
        reject(errorResponse(404, USER_NOT_FOUND));
      }

      // user god
      user.name = body.name;
      user.email = body.email;
      user.role = body.role;

      user.save((error, user) => {
        // errors
        if (error) {
          reject(errorResponse(400, USER_UPDATE_FAILED, error));
        } else if (!user) {
          reject(errorResponse(404, USER_NOT_FOUND));
        } else {
          user.password = undefined;
          resolve(entityResponse(200, user));
        }
      });
    });
  });
};

export const remove = (id: string) => {
  return new Promise((resolve, reject) => {
    // Detele user
    User.findByIdAndRemove(id, (error, user) => {
      // errors
      if (error) {
        reject(errorResponse(500, SERVER_ERROR, error));
      }

      // user not found
      if (!user) {
        reject(errorResponse(404, USER_NOT_FOUND));
      }

      resolve(entityResponse(200, user));
    });
  });
};

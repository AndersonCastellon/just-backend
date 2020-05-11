import User from '../models/User/user.schema';
import { entityResponse, errorResponse } from '../handlers/responses';
import { SERVER_ERROR, USERS_NOT_FOUND } from '../config/messages';

export const getUser = (id: string) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (error, user) => {
      // errors
      if (error) {
        reject(errorResponse(500, SERVER_ERROR, error));
      } else if (!user) {
        reject(errorResponse(404, USERS_NOT_FOUND));
      } else {
        // all ok
        user.password = undefined;
        resolve(entityResponse(user));
      }
    });
  });
};

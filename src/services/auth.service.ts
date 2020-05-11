import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User/user.schema';
const SECRET_KEY: string = process.env.SECRET_KEY as string;
const CLIENT_ID: string = process.env.CLIENT_ID as string;

import { errorResponse } from '../handlers/responses';
import {
  BAD_CREDENTIALS,
  USER_NOT_FOUND,
  SERVER_ERROR
} from '../config/messages';

// Google
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(CLIENT_ID);

export const loginWithEmail = async (body: any) => {
  const user = await User.findOne({ email: body.email });

  if (!user) throw errorResponse(404, USER_NOT_FOUND);

  const passwordValid = await user.verifyPassword(body.password);

  if (!passwordValid) throw errorResponse(401, BAD_CREDENTIALS + ' - PASSWORD');

  // all god
  user.password = undefined;

  // generate jwt
  const token = jwt.sign({ user: user }, SECRET_KEY, {
    expiresIn: 31536000
  });

  return { user, token };
};

export const loginWithGoogle = async (gToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken: gToken,
    audience: CLIENT_ID
  });

  const payload: any = ticket.getPayload();

  const email = payload.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    const newUser = new User({
      name: payload.name,
      email: payload.email,
      photo: payload.picture,
      google: true,
      password: '...'
    });

    const userSaved = await newUser.save();

    if (!userSaved) throw errorResponse(400, 'Creating error');

    // generate jwt
    const token = generateToken(userSaved);

    userSaved.password = undefined;
    return { user: userSaved, token };
  } else {
    user.google = true;
    user.photo = payload.picture;

    const saved = await user.save();

    if (!saved) throw errorResponse(400, 'Creating error');

    // generate jwt
    const token = generateToken(user);

    user.password = undefined;
    return { user, token };
  }
};

export const signin = async (body: any) => {
  const user: IUser = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    photo: body.photo,
    role: body.role
  });

  user.password = await user.encriptPassword(body.password);
  const savedUser = await user.save();

  if (!savedUser) throw errorResponse(500, SERVER_ERROR);

  savedUser.password = undefined;

  const token = generateToken(savedUser);

  return { user: savedUser, token };
};

const generateToken = (user: IUser): string => {
  const expiresIn = 31536000;

  return jwt.sign({ user: user }, SECRET_KEY, {
    expiresIn: expiresIn
  });
};

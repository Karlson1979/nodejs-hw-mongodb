import { UsersCollection } from '../db/models/User.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import SessionCollection from '../db/models/Session.js';
import { randomBytes } from 'crypto';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/users.js';

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'User already exist');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await UsersCollection.create({
    ...payload,
    password: hashPassword,
  });
  return newUser;
};
export const login = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }
  await SessionCollection.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifetime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
  });
};
export const getUser = (filter) => UsersCollection.findOne(filter);
export const getSession = (filter) => SessionCollection.findOne(filter);

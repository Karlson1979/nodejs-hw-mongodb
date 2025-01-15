import createHttpError from 'http-errors';
import { getSession, getUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const authHeaders = req.get('Authorization');
  if (!authHeaders) {
    return next(createHttpError(401, 'Authorization header not found'));
  }
  const [bearer, accessToken] = authHeaders.split(' ');
  if (bearer !== 'Bearer')
    return next(createHttpError(401, 'Header must be type'));
  const session = await getSession({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  if (Date.now() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = await getUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  req.user = user;
  next();
};

import { UsersCollection } from '../db/models/User.js';
export const register = async (payload) => {
  const newUser = await UsersCollection.create(payload);
  return newUser;
};

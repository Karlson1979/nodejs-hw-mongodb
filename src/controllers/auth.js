import * as authServices from '../services/auth.js';

export const registerController = async (req, res, next) => {
  try {
    const newUser = await authServices.register(req.body);

    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

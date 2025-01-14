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

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

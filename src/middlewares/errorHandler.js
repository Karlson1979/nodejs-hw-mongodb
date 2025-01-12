export const errorHandler = (error, req, res, next) => {
  const { status = 500, message } = error;

  const data = error.details || error.stack || null;

  res.status(status).json({
    status,
    message,
  });
};

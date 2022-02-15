exports.errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const errMessage = err.message ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    message: errMessage,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

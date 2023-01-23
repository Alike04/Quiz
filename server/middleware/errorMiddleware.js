const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  console.log(err);
  statusCode = statusCode || 500;
  res.status(statusCode).json({ message: message });
};

module.exports = errorHandler;
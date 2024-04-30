const AppError = require("../utils/AppError");

const handleCastError = function (err) {
  console.log(err, "lk");
  const message = `invalid ${err.path} value of ${err.value}`;
  const error = new AppError(message, 400);
  return error;
};

const handleDuplicate = function (err) {
  const path = Object.keys(err.keyPattern)[0];
  const value = err.keyValue[path];
  const message = `${path} ${value} already exists `;
  console.log(path);
  return new AppError(message, 400, path);
};

const handleValdation = function (err) {
  const errors = Object.values(err);
  const message = errors.map((err) => ({
    path: err.path,
    message: err.message,
  }));
  return new AppError(message, 400);
};

const errorHandler = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  let error = err;
  console.log(err);
  if (err.name === "CastError") error = handleCastError(err);
  if (err.code === 11000) error = handleDuplicate(err);
  if (err.name === "ValidationError") error = handleValdation(err);

  if (error.isOperational) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      status: error.status,
      errorMessage: error.message,
      path: error.path,
    });
  } else {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      status: error.status,
      errorMessage: "something went wrong",
    });
  }
};

module.exports = errorHandler;

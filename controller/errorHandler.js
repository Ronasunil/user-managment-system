const handleInvalidId = function (err) {
  const message = `invalid ${path} value of ${err.value}`;
};

exports.errorHandler = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || fail;

  res.status(err.status).json({
    statusCode: err.statusCode,
    status: err.status,
    errorMessage: err.message,
  });
};

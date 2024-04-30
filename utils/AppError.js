class AppError extends Error {
  constructor(message, statusCode, path) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";
    this.path = path;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

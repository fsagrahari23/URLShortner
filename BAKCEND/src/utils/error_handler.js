export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const BadRequestError = (message = 'Bad Request') =>
  new AppError(message, 400);

export const UnauthorizedError = (message = 'Unauthorized') =>
  new AppError(message, 401);

export const ForbiddenError = (message = 'Forbidden') =>
  new AppError(message, 403);

export const NotFoundError = (message = 'Not Found') =>
  new AppError(message, 404);

export const ConflictError = (message = 'Conflict') =>
  new AppError(message, 409);

export const DuplicateError = (message = 'Duplicate Entry') =>
  new AppError(message, 409);

export const InternalServerError = (message = 'Internal Server Error') =>
  new AppError(message, 500);

// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  console.error('Unhandled Error:', err);

  return res.status(500).json({
    success: false,
    message: err.message||'Something went wrong'
  });
};

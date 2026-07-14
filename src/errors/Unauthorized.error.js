import AppError from "./App.error.js";

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401, "UNAUTHORIZED");
  }
}

export default UnauthorizedError;

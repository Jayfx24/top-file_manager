import AppError from "./App.error.js";

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404, "NOT_FOUND");
  }
}

export default NotFoundError
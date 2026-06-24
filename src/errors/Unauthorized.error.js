import AppError from "./App.error.js";

class Unauthorized extends AppError {
  constructor(message) {
    super(message, 401, "UNAUTHORIZED");
  }
}

export default Unauthorized;

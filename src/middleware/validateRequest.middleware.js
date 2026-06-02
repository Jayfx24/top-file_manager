import { registerSchema } from "../config/validation";

export const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    console.log(error);
    if (!error) {
      req[property] = value;
    }

    const errorDetails = error.details.map((detail) => ({
      path: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(401).json({
      status: "error",
      message: "Validation error",
      errors: errorDetails,
    });
  };
};

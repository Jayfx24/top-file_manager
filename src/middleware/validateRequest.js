export const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    console.log(error);
    if (!error) {
      req[property] = value;
      return next()
    }

    req.validateErrors = error.details.map((detail) => ({
      path: detail.path.join("."),
      message: detail.message,
    }));

    next();
    // r=
    // return res.status(401).json({
    //   status: "error",
    //   message: "Validation error",
    //   errors: errorDetails,
    // });
  };
};

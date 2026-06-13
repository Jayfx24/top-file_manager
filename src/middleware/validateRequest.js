export const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    console.log(error);
    if (!error) {
      req[property] = value;
      return next();
    }

    req.validateErrors = error.details.map((detail) => ({
      path: detail.path.join("."),
      message: detail.message,
    }));

    next();
  };
};

export const validateRequestAsync = (schema, property = "body") => {
  return async (req, res, next) => {
    let value;
    try {
      const value = await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      console.log("The validation -", value);

      req[property] = value;
      return next();
    } catch (err) {
      err;
      console.log('1. ',err.message);
      req.session.validateErrors = [err?.message] ||
        err.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      
      console.log('2. ',req.session.validateErrors);
    }

    next();
  };
};

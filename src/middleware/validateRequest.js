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

    req.session.validateErrors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    req.session.save((err) => {
      if (err) return next(err);
      const backURL = req.header("Referer") || "/";
      res.redirect(backURL);
    });
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
      console.log("1. ", err.message);
      ((req.session.validateErrors = err.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }))),
        // redirect to err page and list error
        console.log("2. ", req.session.validateErrors));
    }

    next();
  };
};

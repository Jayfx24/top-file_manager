import Joi from "joi";

export const authSchema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(20).required(),
  pwd: Joi.string().pattern(
    new RegExp(
      "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$",
    ).required(),
  ),
});

export const registerSchema = authSchema.keys({
  fn: Joi.string().trim().min(2).max(20).required(),
  ln: Joi.string().trim().min(2).max(20).required(),

  cPwd: Joi.string().valid(Joi.ref("pwd")),
});

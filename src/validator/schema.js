import Joi from "joi";

const errMsg = {
  pwd: "password must be et least 8 chars ( one uppercase letter, one lowercase letter and one number",
  cPwd: "confirm password must match password",
};

export const authSchema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(20).required(),
  pwd: Joi.string()
    .trim()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"))

    .message(errMsg.pwd)
    .required(),
});

export const registerSchema = authSchema.append({
  firstName: Joi.string().trim().min(2).max(20).required(),
  lastName: Joi.string().trim().min(2).max(20).required(),

  cPwd: Joi.string()
    .valid(Joi.ref("pwd"))
    .messages({
      "any.only": errMsg.cPwd,
    })
    .required(),
});

// export const loginSchema = authSchema.append({
  
// })

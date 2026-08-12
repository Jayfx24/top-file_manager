import Joi from "joi";
import { prisma } from "../lib/prisma.js";
const errMsg = {
  pwd: "password must be at least 8 chars - \none uppercase letter\none lowercase letter\none number",
  cPwd: "confirm password must match password",
};

export const userExists = async (value, helpers) => {
  const exists = await prisma.user.findUnique({
    where: {
      username: value,
    },
  });
 
  if (exists)
    return helpers.message('Username already exist ');
  return value;
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
  username: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .required()
    .external(userExists)
   ,
  cPwd: Joi.string()
    .valid(Joi.ref("pwd"))
    .messages({
      "any.only": errMsg.cPwd,
    })
    .required(),
});

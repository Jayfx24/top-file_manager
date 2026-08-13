import Joi from "joi";
import { prisma } from "../lib/prisma.js";
const errMsg = {
  pwd: "Minimum 8 characters, at least one letter and one number",
  cPwd: "confirm password must match password",
};

export const userExists = async (value, helpers) => {
  const exists = await prisma.user.findUnique({
    where: {
      username: value,
    },
  });

  if (exists) return helpers.message("Username already exist ");
  return value;
};

export const loginSchema = Joi.object({
  username: Joi.string().trim().required(),
  pwd: Joi.string().trim().required(),
});

export const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(20).required(),
  lastName: Joi.string().trim().min(2).max(20).required(),
  username: Joi.string().trim().min(2).max(20).required().external(userExists),
  pwd: Joi.string()
    .trim()
    .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
    .message(errMsg.pwd)
    .required(),
  cPwd: Joi.string()
    .valid(Joi.ref("pwd"))
    .messages({
      "any.only": errMsg.cPwd,
    })
    .required(),
});

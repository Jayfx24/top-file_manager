import { prisma } from "../lib/prisma.js";
import { matchedData } from "express-validator";

export function login(req, res) {
  return res.render("forms/login");
}

export function registerGet(req, res) {
  return res.render("forms/register");
}

export async function registerPost(req, res, next) {
  if (req.validateErrors) {
    return res.render("forms/register", {
      title: "register",
      errors: req.validateErrors,
    });
  }

  const user = await prisma.user.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      pwd: req.body.pwd,
    },
  });
  return res.redirect("/");
}

export function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

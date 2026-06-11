import { prisma } from "../lib/prisma.js";
import { matchedData } from "express-validator";
import { genPwd } from "../lib/passwordUtils.js";

export function login(req, res) {
  res.locals.errors = req.session.messages;
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
      pwd: genPwd(req.body.pwd),
    },
  });
  return res.redirect("/");
}

export function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
}

export function dashboard(req, res) {
  return res.render("dashboard", { title: "Dashboard" });
}

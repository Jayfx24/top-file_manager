import { prisma } from "../lib/prisma.js";
import { matchedData } from "express-validator";
import { genPwd } from "../lib/passwordUtils.js";
import { getSideMenuData } from "../service/sideMenu.service.js";
import path from "node:path";

export function login(req, res) {
  if (req.isAuthenticated()) return res.redirect(301, "/dashboard");
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

export async function dashboard(req, res) {
  const errors = req.session.validateErrors;
  delete req.session.validateErrors;

  const sideMenu = await getSideMenuData(req.user.id);

  res.locals.breadcrumbs = [{ label: "Home", path: "/" }];

  return res.render("dashboard", {
    title: "Dashboard",
    errors,
    ...sideMenu,
    parentId: 0,
  });
}

export async function updateFile(req, res) {
  const errors = req.session.validateErrors;
  if (errors) return res.redirect("/dashboard");
  const { fileName, fileId, parentId, fileType, originalName } = req.body;

  if (fileType === "file") {
    const newFile = fileName + path.extname(originalName);
    await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        name: newFile,
      },
    });
  } else {
    await prisma.folder.update({
      where: {
        id: fileId,
      },
      data: {
        name: fileName,
      },
    });
  }

  res.redirect(`/folders/${parentId}`);
}

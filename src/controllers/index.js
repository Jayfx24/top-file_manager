import { prisma } from "../lib/prisma.js";
import { matchedData } from "express-validator";
import { genPwd } from "../lib/passwordUtils.js";
import { getSideMenuData } from "../service/service.js";
import { formatBytes } from "../utils.js";

import path from "node:path";

export function login(req, res) {
  if (req.isAuthenticated()) return res.redirect(301, "/dashboard");
  const errors = req.session.messages || req.session.validateErrors;
  delete req.session.validateErrors;

  return res.render("forms/login",{errors});
}

export function registerGet(req, res) {
  return res.render("forms/register", { title: "Sign-up" });
}

export async function registerPost(req, res, next) {
  const errors = req.session.validateErrors;
  delete req.session.validateErrors;
  if (errors) {
    return res.render("forms/register", {
      title: "Sign-up errors",
      errors,
    });
  }

  const pwd = await genPwd(req.body.pwd);
  const user = await prisma.user.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      pwd,
      folders: {
        create: [
          {
            name: req.body.firstName,
          },
        ],
      },
    },
  });

  req.login(user, function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/dashboard");
  });
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
  res.locals.currentUser = req.user;
  // res.locals.breadcrumbs = [{ label: "Home", path: "/" }];

  return res.render("dashboard", {
    title: req.user.username,
    errors,
    ...sideMenu,
    parentId: 0,
    formatBytes,
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

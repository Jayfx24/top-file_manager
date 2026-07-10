import { prisma } from "../lib/prisma.js";

export async function postShareFolder(req, res, next) {
   if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }

  console.log("this should share the folder");
  console.log(req.body)
  const { shareId, endDateDelta } = req.body;

  // const data = {
  //   authorId: req.user.id,
  //   itemId: fileId,
  //   generatedUrl: crypto.randomUUID(),
  //   isActive: true,
  //   endDate,
  //   type: "folder",
  // };

  // // get shared folder id,
  // // save shared folder id, generate route id for unauth user

  // await prisma.shared.create({
  //   data,
  //   users,
  // });

  //
  // next();
  res.redirect(301,"/dashboard")
}

export async function postShareFile(req, res, next) {
  console.log("this should share the file");
  next();
}

export async function viewFolder(req, res, next) {
  // generate all children of the folder
  console.log("this should share the folder");
  next();
}

export async function viewFile(req, res, next) {
  console.log("this should share the folder");
  next();
}

// for shared folder only need to keep its folder id

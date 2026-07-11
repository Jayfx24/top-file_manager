import { prisma } from "../lib/prisma.js";

export async function postShareFolder(req, res, next) {
  if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }
  const { shareId, endDateDelta } = req.body;
  const date = new Date();

  date.setDate(date.getDate() + endDateDelta);
  const data = {
    authorId: req.user.id,
    itemId: shareId,
    generatedUrl: crypto.randomUUID(),
    isActive: true,
    endDate: date,
    type: "folder",
  };
  console.log(data);

  // // get shared folder id,
  // // save shared folder id, generate route id for unauth user

  await prisma.shared.create({
    data,
  });

  //
  // next();
  res.redirect(301, "/share/list");
}

export async function postShareFile(req, res, next) {
  console.log("this should share the file");
  next();
}

export async function getList(req, res, next) {
  // generate all children of the folder
  console.log("this should show the share info page");
  res.locals.fullUrl = (url) => req.protocol + "://" + req.get("host") + url;
  const sharedItems = await prisma.shared.findMany({
    where: {
      authorId: req.user.id,
    },
  });

  return res.render("shared", { sharedItems });
}

export async function viewFile(req, res, next) {
  console.log("this should share the folder");
  next();
}

// for shared folder only need to keep its folder id

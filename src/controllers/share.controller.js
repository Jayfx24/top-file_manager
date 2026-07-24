import { prisma } from "../lib/prisma.js";
import { getSharedFolder } from "../service/sideMenu.service.js";

export async function postShareFolder(req, res, next) {
  if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }
  const { shareId, endDateDelta } = req.body;
  console.log(req.body)
  const date = new Date();
  const generatedUrl = crypto.randomUUID();
  date.setDate(date.getDate() + endDateDelta);
  const data = {
    authorId: req.user.id,
    itemId: shareId,
    generatedUrl,
    isActive: true,
    endDate: date,
    type: "folder",
  };
  console.log('Supposed prisma data :')
  console.log( data)
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
  res.locals.fullUrl = (folderId, url) =>
    req.protocol +
    "://" +
    req.get("host") +
    "/share/folder/" +
    url +
    "/" +
    folderId;

  const userSharedData = await prisma.shared.findMany({
    where: {
      authorId: req.user.id,
      isActive: true,
    },
  });

  return res.render("shared", { userSharedData });
}

export async function getSharedDashboard(req, res, next) {
  const { shareUrl, folderId } = req.params;
  const data = await getSharedFolder(shareUrl);

  if (req.isAuthenticated()) res.locals.currentUser = req.user.id;
  return res.render("dashboard", {
    title: "Content",
    parentId: Number(folderId),
    ...data,
    shareUrl,
  });
}

export async function getSharedFile(req, res) {
  const { shareUrl, folderId, id } = req.params;

  const file = await prisma.file.findUnique({
    where: {
      id: Number(id),
      folderId: Number(folderId),
    },
  });

  if (!file) throw new NotfoundError("File not found");

  if (req.isAuthenticated()) res.locals.currentUser = req.user.id;
  console.log("current user", res.locals.currentUser);
  res.render("file", { title: "FIle name", file });
}

export async function deactivateShared(req, res) {
  const shareUrl = req.params.shareUrl;

  await prisma.shared.update({
    data: {
      isActive: false,
    },
    where: {
      generatedUrl: shareUrl,
    },
  });

  return res.redirect("share/list");
}
// for shared folder only need to keep its folder id

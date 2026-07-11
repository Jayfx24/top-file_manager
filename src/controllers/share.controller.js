import { prisma } from "../lib/prisma.js";
import { getSharedFolder } from "../service/sideMenu.service.js";

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
    req.protocol + "://" + req.get("host") + "/share/" + url + "/" + folderId;

  const userSharedData = await prisma.shared.findMany({
    where: {
      authorId: req.user.id,
    },
  });
  

  return res.render("shared", { userSharedData });
}

export async function getSharedDashboard(req, res, next) {
  const { shareUrl, folderId } = req.params;
  const data = await getSharedFolder(shareUrl);

  return res.render("dashboard", {
    title: "Content",
    parentId: Number(folderId),
    ...data,
  });
}

export async function getSharedContent(req, res) {
  const id = Number(req.params.id);
  const sideMenu = await getSideMenuData(req.user.id);
  const currentFolder = await prisma.folder.findUnique({
    where: {
      id,
    },
  });
  if (!currentFolder) return new NotfoundError("Folder not found");
  res.locals.currentPage = { base: req.baseUrl, path: id };
  console.log(res.locals.currentPage);
  console.log(req.path, req.baseUrl);

  console.log("Breadcrumbs");

  return res.render("dashboard", {
    title: "Content",
    parentId: id,
    ...sideMenu,
  });
}

// for shared folder only need to keep its folder id

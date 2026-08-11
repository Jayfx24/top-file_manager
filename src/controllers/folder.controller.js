import { prisma } from "../lib/prisma.js";
import { getSideMenuData } from "../service/service.js";
import NotFoundError from "../errors/NotFound.error.js";
import UnauthorizedError from "../errors/Unauthorized.error.js";
import { formatBytes } from "../utils.js";

export async function createFolder(req, res) {
  if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }

  const parent = await prisma.folder.findFirst({
    where: {
      parentId: 0,
      authorId: req.user.id,
    },
    select: {
      id: true,
    },
  });
  const parentId = Number(req.params?.parentId) || parent.id;

  const data = req.body;
  console.log(parentId);
  await prisma.folder.create({
    data: {
      name: data.folder.toLowerCase(),
      authorId: req.user.id,
      parentId: parentId,
    },
  });
  return parentId === 0
    ? res.redirect("/dashboard")
    : res.redirect(`/folders/${parentId}`);
}

export async function contentGet(req, res) {
  const id = Number(req.params.id);
  const sideMenu = await getSideMenuData(req.user.id);
  const currentFolder = await prisma.folder.findUnique({
    where: {
      id,
    },
  });
  if (!currentFolder) throw new NotfoundError("Folder not found");
  if (currentFolder.authorId !== Number(req.user.id))
    throw new UnauthorizedError("You are not allowed to view this resource");
  res.locals.currentPage = { base: req.baseUrl, path: id };
  res.locals.currentUser = req.user;

  return res.render("dashboard", {
    title: "Content",
    parentId: id,
    ...sideMenu,
    formatBytes,
  });
}

export async function postFolderDelete(req, res) {
  if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }

  const id = Number(req.params.id);

  const folder = await prisma.folder.findUnique({
    where: {
      id,
    },
  });
  if (!folder) throw new NotFoundError("folder not found");

  if (folder.authorId !== Number(req.user.id))
    throw new UnauthorizedError(
      "You are not permitted to complete this action"
    );

  await prisma.folder.delete({
    where: { id },
  });

  return res.redirect(req.get("Referrer") || "/");
}

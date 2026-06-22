import { prisma } from "../lib/prisma.js";
import { getSideMenuData } from "../service/sideMenu.service.js";

export async function createFolder(req, res) {
  if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }

  const parentId = Number(req.params?.parentId) || 0;
  const data = req.body;
  console.log(data);
  await prisma.folder.create({
    data: {
      name: data.folder.toLowerCase(),
      authorId: req.user.id,
      parentId: parentId,
    },
  });
  return parentId === 0
    ? res.redirect(`dashboard`)
    : res.redirect(`/folders/${parentId}`);
}

export async function contentGet(req, res) {
  const id = Number(req.params.id);
  const sideMenu = await getSideMenuData(req.user.id);

  return res.render("dashboard", {
    title: "Content",
    parentId: id,
    ...sideMenu,
  });
}

import { prisma } from "../lib/prisma.js";

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
  // loop through all files and folder that that folder id and pass to view
  const id = Number(req.params.id);
  console.log("selected folder id :- ", id);

  const userFolders = await prisma.folder.findMany({
    where: {
      authorId: req.user.id,
    },
  });
  
  const folders = await prisma.folder.findMany({
    where: {
      parentId: id,
    },
  });

  const files = await prisma.file.findMany({
    where: {
      folderId: id,
    },
  });

  console.log("user folders :- ", userFolders);

  return folders.length > 0 || files.length > 0
    ? res.render("dashboard", {
        title: "Content",
        userFolders,
        folders,
        files,
        parentId: id,
      })
    : res.render("dashboard", {
        title: "Content",
        userFolders,
        noContent: "No content in folder yet... add new",
        parentId: id,
      });

  // else pass nothing in folder
}

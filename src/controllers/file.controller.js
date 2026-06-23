import { prisma } from "../lib/prisma.js";

export async function uploadFile(req, res) {
  const parentId = Number(req.params?.parentId) || 0;
  const file = req.file;
  // console.log("file parentID: ", parentId);
  // console.group(req.file, req.body);
  // save path to db amd add folderId
  if (parentId) {
    await prisma.file.create({
      data: {
        name: file.filename,
        folderId: parentId,
        authorId: Number(req.user.id),
        url: file.destination,
        size: file.size,
        encoding: file.encoding,
        mimetype: file.mimetype,
      },
    });
  }
  return res.redirect(`/folders/${parentId}`);
}

export async function updateFile(req, res) {
  const errors = req.session.validateErrors;
  if (errors) return res.redirect("/dashboard");
  const { fileName, fileId, parentId } = req.body;

  console.log("updated info", req.body);

  res.redirect(`/folders/${parentId}`);
}

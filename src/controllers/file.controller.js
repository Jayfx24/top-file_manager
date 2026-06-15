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

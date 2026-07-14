import UnauthorizedError from "../errors/Unauthorized.error.js";
import NotfoundError from "../errors/NotFound.error.js";
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
        originalName: file.filename,
        folderId: parentId,
        authorId: Number(req.user.id),
        url: file.destination + "/" + file.name,
        size: file.size,
        encoding: file.encoding,
        mimetype: file.mimetype,
      },
    });
  }
  return res.redirect(`/folders/${parentId}`);
}

export async function getFile(req, res) {
  const id = Number(req.params.id);
  const authorId = Number(req.user.id);
  const file = await prisma.file.findUnique({
    where: {
      authorId,
      id,
    },
  });
  console.log(req.path, req.baseUrl);
  if (!file) return new NotfoundError("File not found");

  console.log(file);
  res.render("file", { title: "FIle name", file });
}

export async function postFileDelete(req, res) {
  if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }

  const id = Number(req.params.id);

  const file = await prisma.file.findUnique({
    where: {
      id,
    },
  });
  if (!file) throw new NotFoundError("file not found");

  if (file.authorId !== Number(req.user.id))
    throw new UnauthorizedError(
      "You are not permitted to complete this action"
    );

  await prisma.file.delete({
    where: { id },
  });

  return res.redirect(req.get("Referrer") || "/");
}

import { reversedWalk } from "../utils.js";
import { prisma } from "../lib/prisma.js";
import NotFoundError from "../errors/NotFound.error.js";

export default async function getBreadcrumbs(req, res, next) {
  const id = Number(req.params.id);
  const baseUrl = req.baseUrl.split("/")[1];
  const data =
    baseUrl === "files"
      ? await prisma.file.findUnique({
          where: { id },
        })
      : await prisma.folder.findUnique({
          where: { id },
        });
  if (!data) return next(new NotFoundError(`${baseUrl} not found`));
  const groupData = await prisma.folder.findMany({
    where: {
      authorId: req.user.id,
    },
  });
  res.locals.breadcrumbs = reversedWalk(data, groupData);
  console.log(res.locals.breadcrumbs);
  next();
}

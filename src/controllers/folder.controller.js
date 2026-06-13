import { prisma } from "../lib/prisma.js";

export async function createFolder(req, res) {
  if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }
  const data = req.body;
  console.log(data);
  await prisma.folder.create({
    data: {
      name: data.folder.toLowerCase(),
      authorId: req.user.id,
    },
  });
  res.redirect("/dashboard");
}

import { prisma } from "../lib/prisma.js";

export async function postShareFolder(req, res, next) {
  console.log("this should share the folder");
  const { folderId, endDate } = req.body;

  const data = {
    authorId: req.user.id,
    itemId: folderId,
    generatedUrl: crypto.randomUUID(),
    isActive: true,
    endDate,
    type: "folder",
  };

  // get shared folder id,
  // save shared folder id, generate route id for unauth user

  await prisma.shared.create({
    data,
    users,
  });

  //
  next();
}

export async function postShareFile(req, res, next) {
  console.log("this should share the file");
  next();
}

export async function viewFolder(req, res, next) {
  // generate all children of the folder
  console.log("this should share the folder");
  next();
}

export async function viewFile(req, res, next) {
  console.log("this should share the folder");
  next();
}

// for shared folder only need to keep its folder id

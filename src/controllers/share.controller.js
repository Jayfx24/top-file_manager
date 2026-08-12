import NotFoundError from "../errors/NotFound.error.js";
import UnauthorizedError from "../errors/Unauthorized.error.js";
import { prisma } from "../lib/prisma.js";
import { differenceInDays } from "date-fns";
import { getSharedFolder } from "../service/service.js";
import { formatBytes } from "../utils.js";
import path from "path";

export async function postShareFolder(req, res, next) {
  if (req.session.validateErrors) {
    return res.redirect("/dashboard");
  }
  const { shareId, endDateDelta } = req.body;

  const date = new Date();
  const generatedUrl = crypto.randomUUID();
  date.setDate(date.getDate() + endDateDelta);
  const data = {
    authorId: req.user.id,
    itemId: shareId,
    generatedUrl,
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
  next();
}

export async function getList(req, res, next) {
  // generate all children of the folder

  res.locals.fullUrl = (folderId, url) =>
    req.protocol +
    "://" +
    req.get("host") +
    "/share/folder/" +
    url +
    "/" +
    folderId;

  const updateShared = await prisma.shared.updateMany({
    where: {
      endDate: {
        lt: new Date(),
      },
    },
    data: {
      isActive: false,
    },
  });
  const userSharedData = await prisma.shared.findMany({
    where: {
      authorId: req.user.id,
      // isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      folders: true,
    },
  });

  userSharedData.forEach((folder) => {
    if (folder.endDate > new Date()) {
      folder.isActive = true;
    }
  });

  return res.render("shared", {title: "Shared folders", userSharedData, differenceInDays });
}

export async function getSharedDashboard(req, res, next) {
  const { shareUrl, folderId } = req.params;

  const data = await getSharedFolder(shareUrl);

  if (req.isAuthenticated()) res.locals.currentUser = req.user.id;

  return res.render("dashboard", {
    title: "Content",
    parentId: Number(folderId),
    ...data,
    shareUrl,
    formatBytes,
  });
}

export async function getSharedFile(req, res) {
  const { shareUrl, folderId, id } = req.params;

  const file = await prisma.file.findUnique({
    where: {
      id: Number(id),
      folderId: Number(folderId),
    },
  });

  if (!file) throw new NotfoundError("File not found");

  if (req.isAuthenticated()) res.locals.currentUser = req.user.id;

  res.render("file", { title: file.name, file, formatBytes, shareUrl });
}

export async function deactivateShared(req, res) {
  const shareUrl = req.params.shareUrl;

  await prisma.shared.update({
    data: {
      isActive: false,
    },
    where: {
      generatedUrl: shareUrl,
    },
  });

  return res.redirect("share/list");
}
// for shared folder only need to keep its folder id

export async function download(req, res, next) {
  const { shareUrl, folderId, id } = req.params;

  try {
    const shareResource = await prisma.shared.findUnique({
      where: {
        generatedUrl: shareUrl,
      },
    });

    if (!shareResource) throw new NotFoundError(" Share link not found");
    if (!shareResource.isActive)
      throw new UnauthorizedError(
        "You are not authorized to perform this action. Permission link has expired"
      );

    const file = await prisma.file.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!file) throw new NotfoundError("File not found");
    if (shareResource.authorId !== file.authorId) {
      throw new UnauthorizedError(
        "You are not authorized to view this resource"
      );
    }

    const filePath = path.join(file.url, file.originalName);

    res.download(filePath, file.name, (err) => {
      if (err) {
        next(new NotfoundError("file not found"));
      }
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
}

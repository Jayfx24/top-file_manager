import UnauthorizedError from "../errors/Unauthorized.error.js";
import NotfoundError from "../errors/NotFound.error.js";
import { prisma } from "../lib/prisma.js";
import { formatBytes } from "../utils.js";
import path from "path";
import cloudUpload from "../middleware/cloudinary.js";
import upload from "../middleware/upload.middleware.js";
import fs from "fs";

export async function uploadFile(req, res) {
  const parentId = Number(req.params?.parentId) || 0;
  const file = req.file;
  const filePath = path.join(file.destination, file.filename);
  console.log(filePath);
  const uploadedFile = await cloudUpload({
    path: filePath,
  });
  console.log("cloud :", uploadedFile);
  if (parentId && uploadedFile) {
    fs.unlinkSync(filePath);
    console.log(filePath, " deleted successfully");

    await prisma.file.create({
      data: {
        name: file.filename,
        originalName: file.filename,
        folderId: parentId,
        authorId: Number(req.user.id),
        url: uploadedFile.secure_url,
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

  res.render("file", { title: "FIle name", file, formatBytes });
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

export async function download(req, res, next) {
  const id = Number(req.params.id);
  const authorId = Number(req.user.id);

  try {
    const file = await prisma.file.findUnique({
      where: {
        authorId,
        id,
      },
    });
    if (!file) return new NotfoundError("File not found");

    const filePath = path.join(file.url, file.originalName);

    res.download(filePath, file.name, (err) => {
      if (err) {
        throw new NotfoundError("file not found");
      }
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
}

export async function fileUpload(req, res) {
  const u = upload.single("uploaded_file");
  u(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      throw new AppError(err.message, 500, err.field);
    } else if (err) {
      throw new AppError(err.message, 500,"APP_ERROR");
    }
  });
}

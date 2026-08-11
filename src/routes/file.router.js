import { Router } from "express";
import multer from "multer";
import {
  uploadFile,
  getFile,
  postFileDelete,
  download,
} from "../controllers/file.controller.js";
import upload from "../middleware/upload.middleware.js";
import { updateSchema } from "../schemas/update.schema.js";
import { validateRequest } from "../middleware/validateRequest.js";
import getBreadcrumbs from "../middleware/breadcrumbs.js";
import { isAuth } from "../middleware/auth.middleware.js";
import AppError from "../errors/App.error.js";

const fileRouter = Router();

const u = upload.single("uploaded_file");

fileRouter.post(
  "/:parentId/upload",
  isAuth,
  u(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      throw new AppError(err.message, 500, err.field);
    } else if (err) {
      throw new AppError(err.message, 500);
    }
  }),
  uploadFile
);
fileRouter.get("/:id/download", isAuth, download);
fileRouter.post("/:id/delete", isAuth, postFileDelete);

fileRouter.get("/:id", isAuth, getBreadcrumbs, getFile);
// fileRouter.post("/share/:id", shareFile);

export default fileRouter;

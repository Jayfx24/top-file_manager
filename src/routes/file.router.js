import { Router } from "express";
import { uploadFile, getFile } from "../controllers/file.controller.js";
import upload from "../middleware/upload.middleware.js";
import { updateSchema } from "../validator/update.schema.js";
import { validateRequest } from "../middleware/validateRequest.js";

const fileRouter = Router();

fileRouter.get("/:id", getFile);
fileRouter.post(
  "/:parentId/upload",
  upload.single("uploaded_file"),
  uploadFile
);
// fileRouter.post("/share/:id", shareFile);

export default fileRouter;

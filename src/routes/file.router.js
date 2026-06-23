import { Router } from "express";
import { uploadFile, updateFile } from "../controllers/file.controller.js";
import upload from "../middleware/upload.middleware.js";
import { updateSchema } from "../validator/update.schema.js";
import { validateRequest } from "../middleware/validateRequest.js";

const fileRouter = Router();

fileRouter.post("/update", validateRequest(updateSchema), updateFile);
fileRouter.post(
  "/:parentId/upload",
  upload.single("uploaded_file"),
  uploadFile
);
// fileRouter.post("/share/:id", shareFile);

export default fileRouter;

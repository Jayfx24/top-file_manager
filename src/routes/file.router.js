import { Router } from "express";
import { uploadFile } from "../controllers/file.controller.js";
import upload from "../middleware/upload.middleware.js";

const fileRouter = Router();

fileRouter.post("/upload", upload.single("uploaded_file"), uploadFile);
// fileRouter.post("/share/:id", shareFile);
// fileRouter.get("/:file", viewFile);

export default fileRouter;

import { Router } from "express";
import { validateRequestAsync } from "../middleware/validateRequest.js";
import { createFolderSchema } from "../schemas/createFolder.schema.js";
import {
  createFolder,
  contentGet,
  postFolderDelete,
} from "../controllers/folder.controller.js";
import getBreadcrumbs from "../middleware/breadcrumbs.js";
import { isAuth } from "../middleware/auth.middleware.js";

const folderRouter = Router();

folderRouter.post("/:id/delete", isAuth, postFolderDelete);
folderRouter.post(
  "/:parentId/new",
  isAuth,
  validateRequestAsync(createFolderSchema),
  createFolder
);
folderRouter.get("/:id", isAuth, getBreadcrumbs, contentGet);


export default folderRouter;

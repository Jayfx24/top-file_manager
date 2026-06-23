import { Router } from "express";
import { validateRequestAsync } from "../middleware/validateRequest.js";
import { createFolderSchema } from "../validator/createFolder.schema.js";
import { createFolder, contentGet } from "../controllers/folder.controller.js";

const folderRouter = Router();

folderRouter.get("/:id", contentGet);
folderRouter.post(
  "/:parentId/new",
  validateRequestAsync(createFolderSchema),
  createFolder
);
// folderRouter.post("/share/:id", shareFolder);
// folderRouter.get("/:folder/:file", viewFile);

// router.get("/new", createFolderGet) ?? dialog

export default folderRouter;

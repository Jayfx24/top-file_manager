import { Router } from "express";
import { validateRequestAsync } from "../middleware/validateRequest.js";
import { createFolderSchema } from "../validation/createFolder.schema.js";
import { createFolder } from "../controllers/folder.controller.js";

const folderRouter = Router();

// folderRouter.get("/", folders);
folderRouter.post(
  "/new",
  validateRequestAsync(createFolderSchema),
  createFolder,
);
// folderRouter.post("/share/:id", shareFolder);
// folderRouter.get("/:folder", folder);
// folderRouter.get("/:folder/:file", viewFile);

// router.get("/new", createFolderGet) ?? dialog

export default folderRouter;

import { Router } from "express";

const folderRouter = Router();

folderRouter.get("/", folders);
folderRouter.post("/new", createFolder);
folderRouter.post("/share/:id", shareFolder);
folderRouter.get("/:folder", folder);
folderRouter.get("/:folder/:file", viewFile);

// router.get("/new", createFolderGet) ?? dialog

export default folderRouter;

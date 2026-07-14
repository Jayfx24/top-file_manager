import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { shareSchema } from "../validator/share.schema.js";
import {
  postShareFolder,
  getList,
  getSharedDashboard,
  getSharedFile,
  deactivateShared
} from "../controllers/share.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { isSharedAuth } from "../middleware/shared.auth.js";

const shareRouter = Router();

shareRouter.get("/list", isAuth, getList);
shareRouter.get(
  "/folder/:shareUrl/:folderId",
  isSharedAuth,
  getSharedDashboard
);

shareRouter.get("/file/:shareUrl/:folderId/:id", isSharedAuth, getSharedFile);
shareRouter.get("/:shareUrl/deactivate", isSharedAuth, deactivateShared);
shareRouter.post("/", isAuth, validateRequest(shareSchema), postShareFolder);

export default shareRouter;

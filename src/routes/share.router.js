import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { shareSchema } from "../validator/share.schema.js";
import {
  postShareFolder,
  getList,
  getSharedDashboard,
} from "../controllers/share.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { isSharedAuth } from "../middleware/shared.auth.js";
const shareRouter = Router();

shareRouter.get("/list", isAuth, getList);
shareRouter.get("/:id/:folderId/:shareUrl", isSharedAuth, getSharedDashboard);
// shareRouter.get("/:shareUrl/:id/:folderId", getSharedDashboard);
shareRouter.post("/", isAuth, validateRequest(shareSchema), postShareFolder);

export default shareRouter;

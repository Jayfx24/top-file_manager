import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { shareSchema } from "../validator/share.schema.js";
import { postShareFolder } from "../controllers/share.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const shareRouter = Router();

shareRouter.post("/", isAuth,validateRequest(shareSchema), postShareFolder );


export default shareRouter;

import { Router } from "express";
import {
  registerGet,
  registerPost,
  login,
  logout,
  dashboard,
} from "../controllers/index.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { router as userRouter } from "./user.router.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { registerSchema } from "../validation/schema.js";
import folderRouter from "./folder.router.js";
import passport from "passport";
// import folderRouter from "./folder.js";
// import fileRouter from "./file.js";

const router = Router();
// if user is authenticated redirect to dashboard
router.use("/folder",folderRouter)
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
    successRedirect: "/dashboard",
  }),
);
router.get("/login", login);
router.get("/logout", logout);
router.get("/dashboard", isAuth, dashboard);
router.get("/register", registerGet);
router.post("/register", validateRequest(registerSchema), registerPost);

// router.use("/folders",folderRouter)
// router.use("/files",folderRouter)

export default router;

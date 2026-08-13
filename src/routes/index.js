import { Router } from "express";
import {
  registerGet,
  registerPost,
  login,
  logout,
  dashboard,
  updateFile,
} from "../controllers/index.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { router as userRouter } from "./user.router.js";
import {
  validateRequest,
  validateRequestAsync,
} from "../middleware/validateRequest.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";
import { updateSchema } from "../schemas/update.schema.js";
import folderRouter from "./folder.router.js";
import fileRouter from "./file.router.js";
import shareRouter from "./share.router.js";
import passport from "passport";

const router = Router();
// if user is authenticated redirect to dashboard

router.use("/files", fileRouter);
router.use("/folders", folderRouter);
router.use("/share", shareRouter);
router.post(
  "/login",
  validateRequest(loginSchema),
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
    successRedirect: "/dashboard",
  })
);
router.get("/login", login);
router.get("/logout", logout);
router.get("/dashboard", isAuth, dashboard);
router.get("/register", registerGet);
router.post("/register", validateRequestAsync(registerSchema), registerPost);
router.use("/update", isAuth, validateRequest(updateSchema), updateFile);
router.get("/", (req, res) => res.redirect("/login"));

// router.use("/files",folderRouter)

export default router;

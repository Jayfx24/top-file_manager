import { Router } from "express";
import { registerGet, registerPost, login, logout } from "../controllers/index.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { registerSchema, authSchema } from "../validation/schema.js";
import passport from "passport";
// import folderRouter from "./folder.js";
// import fileRouter from "./file.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("We are live");
});

router.get("/login", login);
router.get("/logout", logout);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/");
  },
);
// router.get("/login", loginGet);
router.get("/register", registerGet);
router.post("/register", validateRequest(registerSchema), registerPost);

// router.use("/folders",folderRouter)
// router.use("/files",folderRouter)

export default router;

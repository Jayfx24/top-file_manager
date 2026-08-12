import express from "express";
import expressSession from "express-session";
import path from "path";
import "dotenv/config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./lib/prisma.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router from "./routes/index.js";
import { passportConfig } from "./config/passport.js";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();
const session = expressSession({
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000,
  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 15 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

passportConfig(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session);
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.authenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);
app.use((err, req, res, next) => {
  console.error(err);
  if (err.statusCode === 403) {
    return res.render("Page not found. Head back");
  }

  return res.render("errorPage", { error: err });
  // res.status(err.statusCode || 500).json({
  //   error: {
  //     code: err.code || "error",
  //     message: err.message,
  //   },
  // });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("app is live");
});



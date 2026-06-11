import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../lib/prisma.js";
import { isValidPwd, genPwd } from "../lib/passwordUtils.js";

export const passportConfig = (passport) => {
  const customFields = {
    usernameField: "username",
    passwordField: "pwd",
    passReqToCallback: true,
  };

  const cb = async (req, username, pwd, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        req.session.messages = []
        return done(null, false, { message: "User not found" });
      }
      const isValid = await isValidPwd(pwd, user.pwd);
      !isValid
        ? done(null, false, { message: "Incorrect Password" })
        : done(null, user);
    } catch (error) {
      done(error, null);
    }
  };

  passport.use(new LocalStrategy(customFields, cb));

  //  serialize
  passport.serializeUser((user, done) => done(null, user.id));
  // deserialize
  passport.deserializeUser(async (id, done) =>
    prisma.user
      .findUnique({ where: { id: id } })
      .then((user) => done(null, user))
      .catch((err) => done(err)),
  );
};

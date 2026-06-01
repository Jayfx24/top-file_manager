import { prisma } from "../lib/prisma";
import { matchedData } from "express-validator";
import { authSchema, registerSchema } from "../config/validation";

function login(req, res) {}

function registerGet(req, res) {}

async function registerPost(req, res, next) {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res
      .status(401)
      .render("form/register", { title: "Register", errors: error.details });
  }

  // const user = await prisma.user.create({
  //     data:{
  //         firstName: data.fName,
  //         lastName: data.lName,
  //         username: data.username,
  //         pwd: data.pwd
  //     }
  // })
}

// const user = await prisma.user.create({
//   data: {
//     email: "elsa@prisma.io",
//     name: "Elsa Prisma",
//   },
// });

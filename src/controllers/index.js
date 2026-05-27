
import { prisma } from "../lib/prisma";
import { matchedData } from "express-validator";
function login(req,res) {
    
}

function registerGet(req,res) {
    
}

async function registerPost(req,res,next) {
// if err

const data = matchedData(req)

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
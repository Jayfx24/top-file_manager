// import { prisma } from "../lib/prisma.js";
// import { isValidPwd } from "../lib/passwordUtils.js";

// export const authenticateUser = async ({username, pwd}) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       username: username,
//     },
//   });

//   if (!user) return { status: false, error: "NOT_FOUND" };

//   const validPwd = await isValidPwd(pwd, user.pwd);

//   if (!validPwd) return { status: false, error: "BAD_PASSWORD" }
    
// };

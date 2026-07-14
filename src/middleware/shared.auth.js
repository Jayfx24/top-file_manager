import { prisma } from "../lib/prisma.js";
import { } from "../errors/Unauthorized.error.js";

export async function isSharedAuth(req, res, next) {
  const { shareUrl } = req.params;
   
  const isAuth = await prisma.shared.findUnique({
    where: {
      generatedUrl: shareUrl,
    },
  });
  if (!isAuth && !isAuth.isActive ) return  res
      .status(401)
      .json({ msg: "You are not authorizes to view this resource" }); 
  next();
}

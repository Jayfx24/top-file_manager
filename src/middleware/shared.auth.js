import { prisma } from "../lib/prisma.js";
import {} from "../errors/Unauthorized.error.js";

export async function isSharedAuth(req, res, next) {
  const { shareUrl } = req.params;
  // check if link is active
  const updateShared = await prisma.shared.updateMany({
    where: {
      endDate: {
        lt: new Date(),
      },
    },
    data: {
      isActive: false,
    },
  });

  const isAuth = await prisma.shared.findUnique({
    where: {
      generatedUrl: shareUrl,
    },
  });

  if (!isAuth && !isAuth.isActive)
    return res
      .status(401)
      .json({ msg: "You are not authorizes to view this resource" });

  const count = await prisma.shared.update({
    where: {
      generatedUrl: shareUrl,
    },
    data: {
      viewsCount:{
        increment: 1
      }
    }
  });
  
  next();
}

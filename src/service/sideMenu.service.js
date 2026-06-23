import { prisma } from "../lib/prisma.js";

export async function getSideMenuData(userId) {
  const anchorFolders = await prisma.folder.findMany({
    where: {
      parentId: 0,
      authorId: userId,
    },
  });

  const userFiles = await prisma.file.findMany({
    where: {
      authorId: userId,
    },
  });
  const folders = await prisma.folder.findMany({
    where: {
      authorId: userId,
    },
  });
  const folderGroup = Object.groupBy(folders, ({ parentId }) => parentId);
  const fileGroup = Object.groupBy(userFiles, ({ folderId }) => folderId);

  return {
    anchorFolders,
    userFiles,
    folderGroup,
    fileGroup,
    folders,
  };
}

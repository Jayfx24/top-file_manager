import Joi from "joi";
import { prisma } from "../lib/prisma.js";
import ValidationError from "../errors/Validation.error.js";

const folderExists = async (value, helpers) => {
  console.log("The value is ", value);
  const folder = await prisma.folder.findFirst({
    where: {
      name: value, //.toLowerCase(),
    },
  });

  if (folder) throw new ValidationError("folder already exist");
};

export const createFolderSchema = Joi.object({
  folder: Joi.string().trim().min(2).max(20).required().external(folderExists),
});

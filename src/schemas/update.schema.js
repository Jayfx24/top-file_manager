import Joi from "joi";

export const updateSchema = Joi.object({
  fileName: Joi.string().trim().min(2).max(20).required(),
  originalName: Joi.string().required(),
  fileId: Joi.number().required(),
  parentId: Joi.number().required(),
  fileType: Joi.string().trim().valid("folder", "file").required(),
});

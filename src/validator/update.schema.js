import Joi from "joi";

export const updateSchema = Joi.object({
  fileName: Joi.string().trim().min(2).max(20).required(),
  fileId: Joi.number().required(),
  parentId: Joi.number().required(),
  
});

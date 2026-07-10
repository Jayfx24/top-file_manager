import Joi from "joi";

export const shareSchema = Joi.object({
  shareId: Joi.number().integer().required(),
  endDateDelta: Joi.number().valid(3, 7, 10).required(),
  //   fileType: Joi.string().trim().valid("folder", "file").required(),
});

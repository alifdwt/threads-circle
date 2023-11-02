import * as Joi from "joi";

const createThreadsSchema = Joi.object({
  content: Joi.string().required(),
  image: Joi.string(),
  userId: Joi.number().required(),
});

const updateThreadsSchema = Joi.object({
  content: Joi.string(),
  image: Joi.string(),
  userId: Joi.number().required(),
});

export { createThreadsSchema, updateThreadsSchema };

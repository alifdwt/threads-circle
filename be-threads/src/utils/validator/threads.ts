import * as Joi from "joi";

const createThreadsSchema = Joi.object({
  content: Joi.string().required(),
  image: Joi.string(),
  userId: Joi.number().required(),
});

export default createThreadsSchema;

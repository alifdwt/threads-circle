import * as Joi from "joi";

const createUserSchema = Joi.object({
  username: Joi.string().min(4).required(),
  full_name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  profile_picture: Joi.string(),
  profile_description: Joi.string(),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(4),
  full_name: Joi.string().min(4),
  email: Joi.string().email(),
  password: Joi.string().min(4),
  profile_picture: Joi.string(),
  profile_description: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

export { createUserSchema, updateUserSchema, loginSchema };

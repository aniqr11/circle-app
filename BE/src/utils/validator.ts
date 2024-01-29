import * as Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().max(25).required(),
  fullname: Joi.string().max(20),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const postSchema = Joi.object({
  content: Joi.string(),
  image: Joi.string().allow(""),
  user: Joi.number(),
});

export const replySchema = Joi.object({
  content: Joi.string(),
  image: Joi.string().allow(""),
  thread: Joi.number(),
  user: Joi.number(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().allow(null, ""),
  fullname: Joi.string().allow(null, ""),
  email: Joi.string(),
  // password: Joi.string(),
  profile_picture: Joi.string().allow(null, ""),
  profile_description: Joi.string().allow(null, ""),
  bio: Joi.string().allow(null, ""),
});

import { CreateUserParams } from "@/services/users-service";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().min(6),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const oAuthSchema = Joi.object<OAuthParams>({
  name: Joi.string().min(6),
  email: Joi.string().email().required(),
  photoUrl: Joi.string().uri(),
});

export type OAuthParams = { name: string; email: string; photoUrl: string };
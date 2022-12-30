import { AuthenticatedRequest } from "@/middlewares";
import { OAuthParams } from "@/schemas";
import * as authService from "@/services/auth-service";
import * as userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { v4 as uuid } from "uuid";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await userService.createUser({ name, email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  }
  catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function oAuth(req: Request, res: Response) {
  const { name, email, photoUrl } = req.body as OAuthParams;

  try {
    const userExists = await userService.checkIfUserExists(email);

    if (!userExists) {
      const randomPassword = uuid();
      await userService.createUser({ name, email, password: randomPassword });
      const userWithToken = await authService.signIn({ email, password: randomPassword });

      return res.status(httpStatus.OK).send({ token: userWithToken.token });
    }
    else {
      const userId = (await userService.getUserByEmail(email)).id;
      const token = await authService.createSession(userId);

      await userService.updateUser({ name, photoUrl }, userId);

      return res.status(httpStatus.OK).send({ token });
    }
  }
  catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getUserData(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  const user = await userService.getUserById(userId);
  return res.status(httpStatus.OK).send({ user });
}

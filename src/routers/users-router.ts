import { Router } from "express";

import { createUserSchema, oAuthSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { getUserData, oAuth, signUp } from "@/controllers";

const router = Router();

router.post("/sign-up", validateBody(createUserSchema), signUp);
router.put("/oauth", validateBody(oAuthSchema), oAuth);
router.get("/me", authenticateToken, getUserData);

export { router as usersRouter };

import { signIn } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { Router } from "express";

const router = Router();

router.post("/", validateBody(signInSchema), signIn);

export { router as authenticationRouter };

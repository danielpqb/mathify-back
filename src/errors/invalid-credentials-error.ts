import { ApplicationError } from "@/types";

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

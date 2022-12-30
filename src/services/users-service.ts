import { duplicatedEmailError } from "@/errors/duplicated-email-error";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function checkIfUserExists(email: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) return false;
  return true;
}

export async function getUserById(id: number) {
  const user = await userRepository.findById(id);

  delete user.password;
  delete user.updatedAt;
  
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await userRepository.findByEmail(email);
  return user;
}

export async function createUser({ name, email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    email,
    password: hashedPassword,
  });
}

export async function updateUser(
  { name, photoUrl }: Omit<User, "id" | "createdAt" | "password" | "updatedAt" | "email">,
  userId: number,
) {
  return userRepository.update(
    {
      name,
      photoUrl,
    },
    userId,
  );
}

export async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, "name" | "email" | "password">;

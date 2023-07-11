import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}

async function createUser(data: {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return prisma.user.create({ data: data });
}

async function update(data: { name: string; photoUrl: string }, userId: number) {
  return prisma.user.update({
    data,
    where: { id: userId },
  });
}

const userRepository = {
  findByEmail,
  findById,
  createUser,
  update,
};

export default userRepository;

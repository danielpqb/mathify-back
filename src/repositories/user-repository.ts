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

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
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
  create,
  update,
};

export default userRepository;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const postFindMany = async (pageStart, pageEnd) =>
  prisma.film_post.findMany({
    skip: pageStart,
    take: pageEnd,
  });

export const postFindOne = async (post_id) =>
  prisma.film_post.findUnique({
    // join
    include: {
      film: {
        select: {
          title: true,
        },
      },
    },
    where: {
      post_id,
    },
  });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const commentFindMany = async (pageStart, pageEnd, post_id) =>
  prisma.film_comment.findMany({
    where: {
      post_id,
    },
    include: {
      customer: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    skip: pageStart,
    take: pageEnd,
  });

export const commentCreate = async ({ post_id, customer_id, content }) =>
  prisma.film_comment.create({
    data: {
      content,
      post_id,
      customer_id,
    },
  });

// 수정한 댓글 데이터베이스에 업데이트하기 
export const commentUpdate = async (comment_id, content) =>
  prisma.film_comment.update({  
    where: {
      comment_id,
    },
    data: {
      content,
      updated_at: new Date(),
    },
  });

// 댓글 데이터베이스에서 삭제하기 
export const commentDelete = async (comment_id) =>
  prisma.film_comment.delete({
    where: {
      comment_id,
    },
  });
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// model post_reaction {
//   reaction_id   Int           @id @default(autoincrement())
//   reaction_type reaction_type
//   post_id       Int
//   customer_id   Int
//   created_at    DateTime      @db.Timestamp(6)
//   customer      customer      @relation(fields: [customer_id], references: [customer_id], onDelete: NoAction, onUpdate: NoAction)
//   film_post     film_post     @relation(fields: [post_id], references: [post_id], onDelete: NoAction, onUpdate: NoAction)
//   @@unique([post_id, customer_id], map: "unique_post_customer")
// }

// GET film/post/like/:id?count=true
// GET film/post/like/:id/customer/:customerid

export const likeCount = async (post_id) =>
  prisma.post_reaction.count({
    where: {
      post_id,
    },
  });

export const myLikeCount = async ({ post_id, customer_id }) =>
  prisma.post_reaction.count({
    where: {
      post_id,
      customer_id,
    },
  });

// POST film/post/like
export const likeCreate = async ({ post_id, customer_id, reaction_type }) =>
  prisma.post_reaction.create({
    data: {
      reaction_type,
      post_id,
      customer_id,
    },
  });

// DELETE film/post/like/:id
export const likeDelete = async ({ post_id, customer_id }) => {
  const toDelete = await prisma.post_reaction.findUnique({
    where: {
      post_id_customer_id: {
        post_id,
        customer_id,
      },
    },
  });

  return prisma.post_reaction.delete({
    where: {
      reaction_id: toDelete.reaction_id,
    },
  });
};

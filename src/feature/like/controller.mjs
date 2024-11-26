import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { likeCount, likeCreate, likeDelete, myLikeCount } from "./model.mjs";

export const getCounts = async (req, res) => {
  const post_id = req.params.id;
  const isCount = req.query.count;
  if (!isCount || isCount.toLowerCase() === "false")
    return res.status(400).json({ error: "Bad Request" });

  try {
    const count = await likeCount(Number(post_id));
    return res.json({ count });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

export const getLiked = async (req, res) => {
  const post_id = Number(req.params.id);
  const customer_id = Number(req.params.customerId);

  try {
    const isLiked = Boolean(await myLikeCount({ post_id, customer_id }));
    return res.json({ isLiked });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

export const createOne = async (req, res) => {
  const reaction_type = req.body.reactionType;
  const customer_id = req.body.customerId;
  const post_id = req.body.postId;
  if (!post_id || !customer_id || !reaction_type)
    return res.status(400).json({ error: "Bad Request" });

  const like = {
    post_id,
    customer_id,
    reaction_type,
  };

  try {
    const result = await likeCreate(like);
    return res.status(200).json({ data: result });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError ||
      e instanceof PrismaClientValidationError
    )
      // REF: https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors
      // REF: https://www.prisma.io/docs/orm/reference/error-reference#prismaclientvalidationerror
      return res.status(400).json({ error: e.stack });
    return res.status(500).json({ error: e.stack });
  }
};

export const deleteOne = async (req, res) => {
  const post_id = Number(req.params.id);
  const customer_id = Number(req.params.customerId);
  if (!post_id || !customer_id)
    return res.status(400).json({ error: "Bad Request" });

  const like = {
    post_id,
    customer_id,
  };

  try {
    const result = await likeDelete(like);
    return res.status(200).json({ data: result });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError ||
      e instanceof PrismaClientValidationError
    )
      return res.status(400).json({ error: e.stack });
    return res.status(500).json({ error: e.stack });
  }
};

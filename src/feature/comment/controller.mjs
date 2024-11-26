import getPageStartEnd from "../../util/getPageStartEnd.mjs";
import { commentCreate, commentFindMany } from "./model.mjs";

export const getAll = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const post_id = req.params.postId;
  const { pageStart, pageEnd } = getPageStartEnd(Number(limit), Number(page));

  try {
    const result = await commentFindMany(pageStart, pageEnd, Number(post_id));
    if (!result) return res.status(404).json({ error: "Not Found" });
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

export const createOne = async (req, res) => {
  const content = req.body.content;
  const customer_id = req.body.customerId;
  const post_id = req.body.postId;
  if (!post_id || !customer_id || !content)
    return res.status(400).json({ error: "Bad Request" });

  const like = {
    post_id,
    customer_id,
    content,
  };

  try {
    const result = await commentCreate(like);
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(400).json({ error: e.stack });
  }
};

// 댓글 수정 기능
export const updateOne = async (req, res) => {
  const { commentId } = req.params;
  const { content, customerId } = req.body;
  
  if (!commentId || !content || !customerId) {
    return res.status(400).json({ error: "Bad Request" });
  }

  try {
    // 댓글 작성자 확인
    const comment = await prisma.film_comment.findUnique({
      where: { comment_id: Number(commentId) }
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.customer_id !== Number(customerId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await commentUpdate(Number(commentId), content);
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

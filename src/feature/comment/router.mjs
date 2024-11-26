import express from "express";
import { createOne, getAll, updateOne } from "./controller.mjs";

const router = express.Router();
// router.get("/:commentId", getAll);
// router.post("/", createOne);
// router.put("/:commentId", updateOne);

export const commentRouter = router;
export const commentGetRouter = getAll;
export const commentCreateRouter = createOne;
export const commentUpdateRouter = updateOne;

import express from "express";
import { createOne, deleteOne, getCounts, getLiked } from "./controller.mjs";

const router = express.Router();

// GET film/post/like/:id?count=true
router.get("/:id", getCounts);

// GET film/post/like/:id/customer/:customerid
router.get("/:id/customer/:customerId", getLiked);

router.post("/", createOne);

router.delete("/:id/customer/:customerId", deleteOne);

export const likeRouter = router;

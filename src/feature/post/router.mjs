import express from "express";
import { getAll, getOne } from "./controller.mjs";

const router = express.Router();
router.get("/", getAll);
router.get("/:id", getOne);

export const postRouter = router;

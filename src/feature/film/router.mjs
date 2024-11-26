import express from "express";
import { getAll, getOne } from "./controller.mjs";

const router = express.Router();

// GET film
router.get("/", getAll);

// GET film/:id
router.get("/:id", getOne);

export const filmRouter = router;

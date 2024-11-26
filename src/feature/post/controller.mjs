import getPageStartEnd from "../../util/getPageStartEnd.mjs";
import { postFindMany, postFindOne } from "./model.mjs";

export const getAll = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const { pageStart, pageEnd } = getPageStartEnd(Number(limit), Number(page));

  try {
    const result = await postFindMany(pageStart, pageEnd);
    if (!result) return res.status(404).json({ error: "Not Found " });
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

export const getOne = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(404).json({ error: "Not Found" });

  try {
    const result = await postFindOne(id);
    if (!result) return res.status(404).json({ error: "Not Found" });
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

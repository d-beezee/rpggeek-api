import { getSearch } from "@src/api/getSearch";
import express from "express";

export default (app: express.Express) => {
  app.get("/games", async (req, res) => {
    const { q } = req.query;
    if (!q || typeof q !== "string" || q.length < 3) {
      return res.status(400).send("Missing or invalid query parameter 'q'");
    }

    const items = await getSearch(q);
    res.json({ items });
  });
};

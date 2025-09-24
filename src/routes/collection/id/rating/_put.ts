import { getCollection } from "@src/api/getCollection";
import { updateRating } from "@src/api/updateRating";
import { authenticated } from "@src/features/authenticated";
import express from "express";

export default (app: express.Express) => {
  app.put("/:user/collection/:id/rating", authenticated, async (req, res) => {
    const { user, id } = req.params;
    if (!user || !id) {
      return res.status(400).send("Missing user or id");
    }
    const { rating } = req.body;
    if (typeof rating !== "number" || rating < 0 || rating > 10) {
      return res.status(400).send("Rating must be a number between 0 and 10");
    }
    // @ts-ignore
    const { password } = res;
    const collection = await getCollection({ user, password });
    if (!collection) {
      return res.status(404).send("Collection not found");
    }
    const item = collection.find(
      (item) => Number(item.collectionId) === Number(id)
    );
    if (!item) {
      return res.status(404).send("Item not found in collection");
    }
    await updateRating({ id: Number(id), rating, username: user, password });
    res.status(204).send();
  });
};

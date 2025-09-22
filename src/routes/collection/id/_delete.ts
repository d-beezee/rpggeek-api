import { getCollection } from "@src/api/getCollection";
import { removeFromCollection } from "@src/api/removeFromCollection";
import express from "express";

export default (app: express.Express) => {
  app.delete("/:user/collection/:id", async (req, res) => {
    const { user, id } = req.params;
    if (!user || !id) {
      return res.status(400).send("Missing user or id");
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
    await removeFromCollection({ id: Number(id), username: user, password });
    res.status(204).send();
  });
};

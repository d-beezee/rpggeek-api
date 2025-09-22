import { getCollection } from "@src/api/getCollection";
import { saveToCollection } from "@src/api/saveToCollection";
import { authenticated } from "@src/features/authenticated";
import express from "express";

export default (app: express.Express) => {
  app.get("/:user/collection", authenticated, async (req, res) => {
    const { user } = req.params;
    if (!user) {
      return res.status(400).send("Missing user");
    }
    // @ts-ignore
    const { password } = res;
    const collection = await getCollection({ user, password });
    if (!collection) {
      return res.status(404).send("Collection not found");
    }
    res.json({ items: collection });
  });

  app.post("/:user/collection", authenticated, async (req, res) => {
    const { user } = req.params;
    if (!user) {
      return res.status(400).send({ message: "Missing user" });
    }
    const id = req.body.id;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    // @ts-ignore
    const { password } = res;
    const collection = await getCollection({ user, password });
    if (!collection) {
      return res.status(404).send({ message: "Collection not found" });
    }
    const item = collection.find((item) => Number(item.id) === Number(id));
    if (item) {
      return res.status(409).send({ message: "Item already in collection" });
    }
    await saveToCollection({ id, username: user, password });
    res.status(201).send({ message: "Item added to collection" });
  });
};

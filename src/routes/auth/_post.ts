import { getCookies } from "@src/api/getCookies";
import express from "express";

export default (app: express.Express) => {
  app.post("/auth", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Missing username or password");
    }

    const cookies = await getCookies({ user: username, password: password });

    if (!cookies) {
      return res.status(401).send("Invalid username or password");
    }

    res.json({ password: cookies });
  });
};

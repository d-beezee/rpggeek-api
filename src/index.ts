import cors from "cors";
import express from "express";
import auth from "./routes/auth/_post";
import collection from "./routes/collection/_get";
import deleteCollectionItem from "./routes/collection/id/_delete";
import games from "./routes/games/_get";

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

auth(app);
collection(app);
games(app);
deleteCollectionItem(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

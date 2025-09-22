import dotenv from "dotenv";
import { getCollection } from "./api/getCollection";
import { getCookies } from "./api/getCookies";

dotenv.config();

const user = process.env.RPG_USER || "";
const password = process.env.RPG_PASS || "";
const main = async () => {
  const cookies = await getCookies({ user, password });
  if (!cookies) {
    console.error("Failed to retrieve cookies");
    return;
  }
  const collection = await getCollection({ user, password: cookies });
  console.log(collection);
};

main();

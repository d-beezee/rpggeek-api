import axios from "axios";
import { load } from "cheerio";

const getSearch = async (query: string) => {
  const response = await axios.post(
    "https://rpggeek.com/geeksearch.php",
    new URLSearchParams({
      itemid: "0",
      objecttype: "rpgitem",
      onclick: "",
      extraonclick: "",
      action: "instantsearch",
      ajax: "1",
      q: query.trim(),
    }),
    {
      headers: {
        accept: "text/javascript, text/html, application/xml, text/xml, */*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }
  );
  const $ = load(response.data);

  const items = $("body > div").map((_, el) => {
    const a =
      $(el)
        .attr("onclick")
        ?.replace(/[\t\n;()]/g, "")
        .replace("SetInstantSearchObject", "")
        .trim() || "";

    const objectIdMatch = a.match(/objectid:'(\d+)'/);
    const objectId = objectIdMatch ? objectIdMatch[1] : null;

    const name = $(el).text().trim().replace(/\s+/g, " ");
    const id = Number(objectId);
    return { id, name };
  });
  return Array.from(items);
};

export { getSearch };

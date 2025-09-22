import axios from "axios";
import { load } from "cheerio";

const getCollection = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  const cookies = [`bggusername=${user};`, `bggpassword=${password};`];
  const collection = await axios.get(
    `https://rpggeek.com/geekcollection.php?ajax=1&action=collectionpage&username=${user}&gallery=&sort=title&sortdir=&page=&pageID=1&ff=&hiddencolumns=&publisherid=&searchstr=&rankobjecttype=subtype&rankobjectid=17&columns[]=title&columns[]=rating&minrating=&rating=&minbggrating=&bggrating=&minplays=&maxplays=&minpricepaid=&maxpricepaid=&minvalue=&maxvalue=&mindate=&dateinput=&maxdate=&dateinput=&searchfield=title&geekranks=RPG%20Rank&subtype=rpgitem&excludesubtype=&own=both&trade=both&want=both&wanttobuy=both&prevowned=both&comment=both&wishlist=both&rated=both&played=both&wanttoplay=both&preordered=both&wishlistpriority=&direct=1`,

    {
      headers: {
        accept: "text/javascript, text/html, application/xml, text/xml, */*",
        "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/json;charset=UTF-8",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        cookie: cookies.join(" "),
        "sec-fetch-site": "same-origin",
        Referer: "https://rpggeek.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    }
  );

  const $ = load(collection.data);

  const items = Array.from(
    $("#collectionitems tr")
      .filter((_, row) => {
        const hasId = $(row).attr("id");
        return typeof hasId !== "undefined" && hasId.startsWith("row_");
      })
      .map((_, row) => {
        const rating = $(row).find(".collection_rating.editfield");
        const command = rating.attr("onclick")?.replace("CE_EditData", "");
        const item = eval(command || "");

        const nameData = $(row).find(".collection_objectname");
        const objectId = item.objectid;
        const collectionId = item.collid;
        const links = nameData.find("a");
        const names = Array.from(
          links.map((_, link) => {
            return $(link).html();
          })
        );
        const nameObject = {
          id: objectId,
          collectionId: collectionId,
          main: names[0],
          ...(names.length > 1 ? { game: names[1] } : {}),
          ...(names.length > 2 ? { genre: names[2] } : {}),
        };
        return nameObject;
      })
  );

  return await Promise.all(
    items.map(async (item) => {
      const thing = await axios.get(
        `https://api.geekdo.com/api/things/${item.id}?partial=essential`
      );
      const imageId = thing.data.imageid;
      const image = await axios.get(
        `https://api.geekdo.com/api/images/${imageId}`
      );
      const imageUrl = image.data.images.original.url;
      return {
        ...item,
        image: imageUrl,
      };
    })
  );
};

export { getCollection };

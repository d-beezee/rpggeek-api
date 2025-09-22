import axios from "axios";

const removeFromCollection = async ({
  id,
  username,
  password,
}: {
  id: number;
  username: string;
  password: string;
}) => {
  const response = await axios.post(
    "https://rpggeek.com/geekcollection.php",
    new URLSearchParams({
      collid: id.toString(),
      ajax: "1",
      action: "delete",
    }),
    {
      headers: {
        "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie: `bggpassword=${password};bggusername=${username};`,

        Referer: "https://rpggeek.com/collection/user/mclochard",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    }
  );
  console.log(response.data);
};

export { removeFromCollection };

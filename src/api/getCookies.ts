import axios from "axios";

const getCookies = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  const axiosRes = await axios.post(
    "https://rpggeek.com/login/api/v1",
    {
      credentials: { username: user, password: password },
    },
    {
      headers: {
        accept: "application/json, text/plain, */*",
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
        "sec-fetch-site": "same-origin",
        Referer: "https://rpggeek.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    }
  );

  // get response cookies
  const passwordCookie = axiosRes.headers["set-cookie"]
    ?.filter((cookie) => !cookie.includes("=deleted;"))
    .map((cookie) => {
      const parts = cookie.split(";");
      return {
        name: parts[0].split("=")[0],
        value: parts[0].split("=")[1],
      };
    })
    .find((cookie) => cookie.name === "bggpassword");

  if (!passwordCookie) {
    return null;
  }

  return passwordCookie.value;
};

export { getCookies };

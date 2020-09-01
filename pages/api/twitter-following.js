import TwitterApi from "../../utils/api/TwitterApi";

export default async (req, res) => {
  const { oauth_token, oauth_token_secret } = req.headers;

  const client = new TwitterApi(
    {
      url: "https://api.twitter.com/1.1/friends/list.json?count=20",
      method: "GET",
    },
    {
      key: oauth_token,
      secret: oauth_token_secret,
    }
  );

  res.json(await client.request());
};

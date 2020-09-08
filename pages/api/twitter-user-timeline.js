import TwitterApi from "../../utils/api/TwitterApi";

export default async (req, res) => {
  const { oauth_token, oauth_token_secret } = req.headers;
  const userId = req.query.id;

  console.log("USERID", userId);

  const client = new TwitterApi(
    {
      url: `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}`,
      method: "GET",
    },
    {
      key: oauth_token,
      secret: oauth_token_secret,
    }
  );

  res.json(await client.request());
};

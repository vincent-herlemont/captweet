import TwitterApi from "../../utils/api/TwitterApi";

export default async (req, res) => {
  const { oauth_token, oauth_token_secret } = req.headers;
  const userId = req.query.id;
  const screenName = req.query.name;

  console.log("USERID/ScreenName", userId, screenName);

  const client = new TwitterApi(
    {
      url: `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&screen_name=${screenName}&include_rts=false&exclude_replies=true`,
      method: "GET",
    },
    {
      key: oauth_token,
      secret: oauth_token_secret,
    }
  );

  res.json(await client.request());
};

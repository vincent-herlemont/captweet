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

  const response = await client.request();

  if (!response || !response.data.length) {
    return res.json([]);
  }

  // let embeddedTweets = [];
  // for (let tweet of response.data) {
  //   if (tweet.entities && tweet.entities.urls && tweet.entities.urls.length) {
  //     for (let { url, expanded_url } of tweet.entities.urls) {
  //       if (expanded_url) {
  //         let match = expanded_url.match(
  //           /^https:\/\/twitter\.com.+(\/status\/)([0-9]+)/
  //         );
  //         if (match && match.length === 3) {
  //           embeddedTweets.push({
  //             url,
  //             tweet_id: match[2],
  //             parent_tweet: tweet.id,
  //           });
  //         }
  //       }
  //     }
  //   }
  // }
  //
  // if (embeddedTweets.length > 0) {
  //   let listIds = embeddedTweets.reduce(
  //     (last, current) => last + (last ? "," : "") + current.tweet_id,
  //     ""
  //   );
  //
  //   const client = new TwitterApi(
  //     {
  //       url: `https://api.twitter.com/2/tweets?ids=${listIds}&media.fields=attachments`,
  //       method: "GET",
  //     },
  //     {
  //       key: oauth_token,
  //       secret: oauth_token_secret,
  //     }
  //   );
  //
  //   const responseEmbeddedTweets = await client.request();
  //   return res.json(responseEmbeddedTweets);
  //   // if (responseEmbeddedTweets && responseEmbeddedTweets.data.length) {
  //   //   embeddedTweets.map((embeddedTweet) => {
  //   //     embeddedTweet.tweet = responseEmbeddedTweets.data.find(
  //   //       (tweet) => tweet.id_str === embeddedTweet.tweet_id
  //   //     );
  //   //   });
  //   //
  //   //   // console.log(embeddedTweets);
  //   //   // return res.json(embeddedTweets);
  //   // }
  // }

  return res.json(response);
};

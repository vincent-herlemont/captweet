import TwitterApi from "../../utils/api/TwitterApi";

export default async (req, res) => {
  const { oauth_token, oauth_token_secret } = req.headers;
  const userId = req.query.id;
  const screenName = req.query.name;

  const token = {
    key: oauth_token,
    secret: oauth_token_secret,
  };

  console.log("USERID/ScreenName", userId, screenName);

  const tweets = await getUserTimeLines(userId, screenName, token);

  const tweetsDataV2 = await getTweetV2(tweets, token);

  const tweetsV2 = tweetV2HydrateAttachments(tweetsDataV2);

  const hydratedTweets = tweetsHydrate(tweets, tweetsV2);

  return res.json(hydratedTweets);
};

function tweetsHydrate(tweets, tweetsV2) {
  if (!tweetsV2) {
    console.error("tweetsV2 are undefined", tweetsV2);
    return tweets;
  }
  return tweets.map((tweet) => {
    const tweetV2 = tweetsV2.find((tweetV2) => tweetV2.id === tweet.id_str);

    if (tweetV2) {
      tweet.v2 = tweetV2;
    }

    return tweet;
  });
}

function tweetV2HydrateAttachments(tweetsV2) {
  if (!tweetsV2?.includes?.media?.length) {
    return tweetsV2.data;
  }

  const medias = tweetsV2.includes.media;

  return tweetsV2.data.map((tweet) => {
    if (!tweet?.attachments?.media_keys?.length) {
      return tweet;
    }

    tweet.attachments.media = [];
    for (let media_key of tweet.attachments.media_keys) {
      const media = medias.find((media) => media.media_key === media_key);
      tweet.attachments.media.push(media);
    }

    return tweet;
  });
}

async function getTweetV2(tweets, token) {
  const tweetIds = tweets.map((tweet) => tweet.id_str).join(",");

  const client = new TwitterApi(
    {
      url: `https://api.twitter.com/2/tweets?ids=${tweetIds}&tweet.fields=attachments,lang,withheld&expansions=attachments.media_keys&media.fields=media_key,preview_image_url,url,height`,
      method: "GET",
    },
    token
  );

  const response = await client.request();

  if (!response?.data?.data?.length) {
    return [];
  }

  return response.data;
}

async function getUserTimeLines(userId, screenName, token) {
  const client = new TwitterApi(
    {
      url: `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&screen_name=${screenName}&include_rts=false&exclude_replies=true`,
      method: "GET",
    },
    token
  );

  const response = await client.request();

  if (!response?.data?.length) {
    return [];
  }

  return response.data;
}

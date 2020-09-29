import TwitterApi from "../../utils/api/TwitterApi";

const util = require("util");

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

  const tweetIds = tweets.map((tweet) => tweet.id_str).join(",");

  const tweetsDataV2 = await getTweetV2(tweetIds, token);

  const tweetsV2 = await workflowTweetV2(tweetsDataV2, token);

  hydrateTweets(tweets, tweetsV2);

  return res.json(tweets);
};

async function workflowTweetV2(tweetsV2, token) {
  await hydrateTweetV2ReferencedTweets(tweetsV2, token);
  hydrateTweetV2Attachments(tweetsV2);
  hydrateTweetV2Users(tweetsV2);

  if (!tweetsV2?.data) {
    return [];
  }
  return tweetsV2.data;
}

async function hydrateTweetV2ReferencedTweets(tweetsV2, token) {
  let ids_references = extractReferencesIdOfTweetsV2(tweetsV2);
  if (ids_references?.length < 1) {
    return tweetsV2;
  }

  ids_references = extractReferencesIdOfTweetsV2(tweetsV2).join(",");

  let referenceTweetV2 = await getTweetV2(ids_references, token);

  hydrateTweetV2Attachments(referenceTweetV2);
  hydrateTweetV2Users(referenceTweetV2);

  if (!referenceTweetV2?.data?.length) {
    return tweetsV2;
  }
  referenceTweetV2 = referenceTweetV2.data;

  _hydrateTweetV2ReferencedTweets(tweetsV2, referenceTweetV2);
}

function _hydrateTweetV2ReferencedTweets(tweetsV2, referenceTweetsV2) {
  if (!tweetsV2?.data?.length) {
    return tweetsV2;
  }

  tweetsV2.data.map((tweetV2) => {
    if (!tweetV2?.referenced_tweets?.length) {
      return tweetV2;
    }
    tweetV2.referenced_tweets.map((referenced_tweet) => {
      const referenceTweetV2 = referenceTweetsV2.find((referenceTweetV2) => {
        return referenced_tweet?.id === referenceTweetV2?.id;
      });

      if (!referenceTweetV2) {
        return referenced_tweet;
      }

      referenced_tweet.data = referenceTweetV2;

      return referenced_tweet;
    });
  });

  return tweetsV2;
}

function extractReferencesIdOfTweetsV2(tweetsV2) {
  if (!tweetsV2?.data?.length > 0) {
    return tweetsV2;
  }
  let ids_references = [];
  for (let tweetV2 of tweetsV2.data) {
    if (tweetV2?.referenced_tweets?.length > 0) {
      for (let referenced_tweet of tweetV2.referenced_tweets) {
        if (referenced_tweet?.id) {
          ids_references.push(referenced_tweet.id);
        }
      }
    }
  }
  return ids_references;
}

function hydrateTweetV2Users(tweetsV2) {
  if (!tweetsV2?.data?.length && !tweetsV2?.includes?.users?.length) {
    return tweetsV2;
  }

  tweetsV2.data.map((tweetV2) => {
    if (tweetV2?.author_id) {
      const author = tweetsV2.includes.users.find(
        (user) => user.id === tweetV2.author_id
      );
      if (author) {
        tweetV2.author = author;
      }
    }
    return tweetV2;
  });

  return tweetsV2;
}

function hydrateTweetV2Attachments(tweetsV2) {
  if (!tweetsV2?.includes?.media?.length) {
    return tweetsV2.data;
  }

  const medias = tweetsV2.includes.media;

  tweetsV2.data.map((tweet) => {
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

  return tweetsV2;
}

function hydrateTweets(tweets, tweetsV2) {
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

async function getTweetV2(tweetIdsStr, token) {
  const client = new TwitterApi(
    {
      url: `https://api.twitter.com/2/tweets?ids=${tweetIdsStr}&tweet.fields=attachments,lang,withheld,referenced_tweets,author_id&expansions=attachments.media_keys,author_id&media.fields=media_key,preview_image_url,url,height&user.fields=profile_image_url`,
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

export {
  hydrateTweetV2Attachments,
  extractReferencesIdOfTweetsV2,
  hydrateTweetV2Users,
  _hydrateTweetV2ReferencedTweets,
};

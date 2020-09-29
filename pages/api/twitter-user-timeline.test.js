import {
  _hydrateTweetV2ReferencedTweets,
  extractReferencesIdOfTweetsV2,
  hydrateTweetV2Attachments,
  hydrateTweetV2Users,
} from "./twitter-user-timeline";

test("hydrateTweetV2ReferencedTweets", () => {
  const inputTweetV2 = {
    data: [
      {
        author_id: "49398462",
        lang: "fr",
        text: "test_0",
        id: "1305806023840665600",
        referenced_tweets: [{ type: "quoted", id: "1305776243321827328" }],
      },
      {
        author_id: "49398462",
        lang: "fr",
        text: "test_1",
        id: "1305544744139882496",
        referenced_tweets: [{ type: "quoted", id: "1305528614717460480" }],
      },
      {
        author_id: "49398462",
        lang: "fr",
        text: "test_2",
        id: "1304460020051054592",
        referenced_tweets: [{ type: "quoted", id: "1304452176346050566" }],
      },
      {
        author_id: "49398462",
        lang: "und",
        text: "test_3",
        id: "1304389736715427841",
        referenced_tweets: [{ type: "quoted", id: "1304389501515685890" }],
      },
    ],
    includes: {
      users: [
        {
          id: "49398462",
          profile_image_url:
            "https://pbs.twimg.com/profile_images/3511398739/5eb98449c106f3933a813f31c638b4f5_normal.jpeg",
          name: "Augustin Trapenard",
          username: "ATrapenard",
        },
      ],
    },
  };

  const inputReferenceTweetV2 = [
    {
      attachments: {
        media_keys: ["13_1305519305631637505"],
        media: [
          {
            height: 720,
            media_key: "13_1305519305631637505",
            type: "video",
            preview_image_url:
              "https://pbs.twimg.com/media/Eh4jWYOXgAEDqA3.jpg",
          },
        ],
      },
      lang: "fr",
      text: "test_0",
      id: "1305776243321827328",
      author_id: "326698989",
      author: {
        username: "canalplus",
        name: "CANAL+",
        id: "326698989",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/978187415536963584/yS-EtXse_normal.jpg",
      },
    },
    {
      attachments: {
        media_keys: ["3_1305528610464370689"],
        media: [
          {
            height: 360,
            media_key: "3_1305528610464370689",
            type: "photo",
            url: "https://pbs.twimg.com/media/Eh4rWq7WkAEJwh8.jpg",
          },
        ],
      },
      lang: "fr",
      text: "test_1",
      id: "1305528614717460480",
      author_id: "108557659",
      author: {
        username: "BSF_Inter",
        name: "Bibliothèques Sans Frontières",
        id: "108557659",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1093891299374190592/saEDuWvQ_normal.jpg",
      },
    },
    {
      lang: "fr",
      text: "test_2",
      id: "1304452176346050566",
      author_id: "108557659",
      author: {
        username: "BSF_Inter",
        name: "Bibliothèques Sans Frontières",
        id: "108557659",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1093891299374190592/saEDuWvQ_normal.jpg",
      },
    },
    {
      attachments: {
        media_keys: ["3_1304389498126635008"],
        media: [
          {
            height: 566,
            media_key: "3_1304389498126635008",
            type: "photo",
            url: "https://pbs.twimg.com/media/EhofVmyWkAAwJWz.jpg",
          },
        ],
      },
      lang: "fr",
      text: "test_3",
      id: "1304389501515685890",
      author_id: "34867057",
      author: {
        username: "franceinter",
        name: "France Inter",
        id: "34867057",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/755746740779749376/f-lxJosk_normal.jpg",
      },
    },
  ];
  const data = _hydrateTweetV2ReferencedTweets(
    inputTweetV2,
    inputReferenceTweetV2
  );
  expect(data).toMatchSnapshot();
});

test("extractReferencesIdOfTweetsV2", () => {
  const inputTweetsV2ReferencedTweets = {
    data: [
      {
        referenced_tweets: [{ type: "quoted", id: "1305528614717460480" }],
        lang: "fr",
        text: "test_1",
        id: "1305544744139882496",
        author_id: "49398462",
      },
      {
        referenced_tweets: [{ type: "quoted", id: "1304452176346050566" }],
        lang: "fr",
        text: "test_2",
        id: "1304460020051054592",
        author_id: "49398462",
      },
      {
        referenced_tweets: [{ type: "quoted", id: "1304389501515685890" }],
        lang: "und",
        text: "test_3",
        id: "1304389736715427841",
        author_id: "49398462",
      },
    ],
  };

  const data = extractReferencesIdOfTweetsV2(inputTweetsV2ReferencedTweets);
  expect(data).toMatchSnapshot();
});

test("hydrateTweetV2Users", () => {
  const inputTweetsV2Users = {
    data: [
      {
        text: "test_0",
        id: "1305776243321827328",
        attachments: { media_keys: ["13_1305519305631637505"] },
        author_id: "326698989",
        lang: "fr",
      },
      {
        text: "test_1",
        id: "1305528614717460480",
        attachments: { media_keys: ["3_1305528610464370689"] },
        author_id: "108557659",
        lang: "fr",
      },
      {
        text: "test_2",
        id: "1304452176346050566",
        author_id: "108557659",
        lang: "fr",
      },
      {
        text: "test_3",
        id: "1304389501515685890",
        attachments: { media_keys: ["3_1304389498126635008"] },
        author_id: "34867057",
        lang: "fr",
      },
    ],
    includes: {
      users: [
        {
          id: "326698989",
          name: "CANAL+",
          username: "canalplus",
          profile_image_url: "https:://...",
        },
        {
          id: "108557659",
          name: "Bibliothèques Sans Frontières",
          username: "BSF_Inter",
          profile_image_url: "https:://...",
        },
        {
          id: "34867057",
          name: "France Inter",
          username: "franceinter",
          profile_image_url: "https:://...",
        },
      ],
    },
  };
  const data = hydrateTweetV2Users(inputTweetsV2Users);
  expect(data).toMatchSnapshot();
});

test("tweetV2HydrateAttachments-media", () => {
  const inputTweetsV2Media = {
    data: [
      {
        attachments: { media_keys: ["13_1302293057916882945"] },
        lang: "fr",
        text: "data_1",
        id: "1303236088216137728",
      },
      {
        attachments: {
          media_keys: ["3_1301470606249136129", "3_1301470606249136130"],
        },
        lang: "fr",
        text: "data_2",
        id: "1301470615786921986",
      },
    ],
    includes: {
      media: [
        {
          height: 1080,
          media_key: "13_1302293057916882945",
          type: "video",
          preview_image_url: "https://pbs.twimg.com/media/XXXXXX.jpg",
        },
        {
          height: 1080,
          media_key: "3_1301470606249136129",
          type: "video",
          preview_image_url: "https://pbs.twimg.com/media/XXXXXX.jpg",
        },
        {
          height: 2048,
          media_key: "3_1301470606249136130",
          type: "photo",
          url: "https://pbs.twimg.com/media/XXXXXX.jpg",
        },
      ],
    },
  };

  const data = hydrateTweetV2Attachments(inputTweetsV2Media);
  expect(data).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import Tweet from "./Tweet";
import theme from "../../styles/theme";
import { ThemeProvider } from "styled-components";

test("Simple empty", () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Tweet tweet={{}} />
    </ThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Simple text", () => {
  const tweet = {
    created_at: "Tue Sep 15 11:41:26 +0000 2020",
    id: 1305834106467561500,
    id_str: "1305834106467561474",
    text: "C'est si beau &lt;3 https://t.co/IX23UoNkJc",
    truncated: false,
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: [
        {
          url: "https://t.co/IX23UoNkJc",
          expanded_url:
            "https://www.youtube.com/watch?v=OV0KkYUa6iA&ab_channel=FranceMusique",
          display_url: "youtube.com/watch?v=OV0KkY…",
          indices: [20, 43],
        },
      ],
    },
    source:
      '<a href="https://about.twitter.com/products/tweetdeck" rel="nofollow">TweetDeck</a>',
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: {
      id: 1198721707,
      id_str: "1198721707",
      name: "Fanny Cohen Moreau",
      screen_name: "FannyCOMO",
      location: "From Casablanca to Paris",
      description:
        "Parle bcp #podcast et #MoyenAge, journaliste & prod #radio et #web / 🎧 Créatrice de @PMedievistes @PModernistes & @Multimorphoses_ / Formations @PodcasteoFR",
      url: "https://t.co/3ClSCaOVNs",
      entities: {
        url: {
          urls: [
            {
              url: "https://t.co/3ClSCaOVNs",
              expanded_url: "https://passionmedievistes.fr/",
              display_url: "passionmedievistes.fr",
              indices: [0, 23],
            },
          ],
        },
        description: { urls: [] },
      },
      protected: false,
      followers_count: 5793,
      friends_count: 1870,
      listed_count: 182,
      created_at: "Tue Feb 19 21:32:31 +0000 2013",
      favourites_count: 150535,
      utc_offset: null,
      time_zone: null,
      geo_enabled: true,
      verified: false,
      statuses_count: 28682,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      is_translation_enabled: false,
      profile_background_color: "EDECE9",
      profile_background_image_url:
        "http://abs.twimg.com/images/themes/theme3/bg.gif",
      profile_background_image_url_https:
        "https://abs.twimg.com/images/themes/theme3/bg.gif",
      profile_background_tile: false,
      profile_image_url:
        "http://pbs.twimg.com/profile_images/1047086509013241858/gFyIPSS4_normal.jpg",
      profile_image_url_https:
        "https://pbs.twimg.com/profile_images/1047086509013241858/gFyIPSS4_normal.jpg",
      profile_banner_url:
        "https://pbs.twimg.com/profile_banners/1198721707/1501229419",
      profile_link_color: "088253",
      profile_sidebar_border_color: "D3D2CF",
      profile_sidebar_fill_color: "E3E2DE",
      profile_text_color: "634047",
      profile_use_background_image: true,
      has_extended_profile: true,
      default_profile: false,
      default_profile_image: false,
      following: true,
      follow_request_sent: false,
      notifications: false,
      translator_type: "none",
    },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    retweet_count: 1,
    favorite_count: 2,
    favorited: false,
    retweeted: false,
    possibly_sensitive: false,
    lang: "fr",
    v2: {
      text: "C'est si beau &lt;3 https://t.co/IX23UoNkJc",
      id: "1305834106467561474",
      author_id: "1198721707",
      lang: "fr",
      author: {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1047086509013241858/gFyIPSS4_normal.jpg",
        username: "FannyCOMO",
        id: "1198721707",
        name: "Fanny Cohen Moreau",
      },
    },
  };

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Tweet tweet={tweet} />
    </ThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Reference Tweet", () => {
  const tweet = {
    created_at: "Sun Sep 13 08:18:07 +0000 2020",
    id: 1305058164832964600,
    id_str: "1305058164832964609",
    text: "Short/long https://t.co/u52aQGmVng https://t.co/FsCWqU0zNy",
    user: {
      id: 174453700,
      id_str: "174453700",
      name: "ira.",
    },
    v2: {
      id: "1305058164832964609",
      text: "Short/long https://t.co/u52aQGmVng https://t.co/FsCWqU0zNy",
      attachments: {
        media_keys: ["3_1305058147997020162", "3_1305058156150755333"],
        media: [
          {
            type: "photo",
            height: 2048,
            url: "https://pbs.twimg.com/media/Ehx_eJqXcAIFxAj.jpg",
            media_key: "3_1305058147997020162",
          },
          {
            type: "photo",
            height: 2048,
            url: "https://pbs.twimg.com/media/Ehx_eoCXkAU9dCS.jpg",
            media_key: "3_1305058156150755333",
          },
        ],
      },
      referenced_tweets: [
        {
          type: "quoted",
          id: "1305041243278159873",
          data: {
            id: "1305041243278159873",
            lang: "en",
            attachments: {
              media_keys: ["3_1305041239222308865", "3_1305041241701113861"],
              media: [
                {
                  url: "https://pbs.twimg.com/media/EhxwF7kU0AEhFWh.jpg",
                  media_key: "3_1305041239222308865",
                  type: "photo",
                  height: 2048,
                },
                {
                  url: "https://pbs.twimg.com/media/EhxwGEzUYAURq0X.jpg",
                  media_key: "3_1305041241701113861",
                  type: "photo",
                  height: 1280,
                },
              ],
            },
            author_id: "2978661890",
            referenced_tweets: [{ type: "quoted", id: "1304939758460776450" }],
            text:
              "Short/long\n\nI'm growing it out now because I miss having that lovely flowing hair ☺️ https://t.co/bsxIWkEJTM https://t.co/TkGzC24xCG",
            author: {
              username: "zkat__",
              name: "Kat Marchán 😷",
              profile_image_url:
                "https://pbs.twimg.com/profile_images/1290148984044941313/iskYvF-D_normal.jpg",
              id: "2978661890",
            },
          },
        },
      ],
      author_id: "174453700",
      lang: "en",
      author: {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1220754625692884992/kgbKzQvu_normal.jpg",
        id: "174453700",
        username: "_lrlna",
        name: "ira.",
      },
    },
  };

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Tweet tweet={tweet} />
    </ThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

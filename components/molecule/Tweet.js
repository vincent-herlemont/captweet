import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePreview from "./ProfilePreview";
import twitterText from "twitter-text";

const Tweet = ({ className, tweet, onClick, hide }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(tweet.text);

  useEffect(() => {
    const turls = tweet.text.match(/(https?:\/\/t\.co[^\s]+)/);
    if (turls && turls.length) {
      if (tweet.entities.media) {
        let imageUrl = turls[0];

        let entity = tweet.entities.media.find((e) => {
          return e.url === imageUrl ? e : null;
        });

        if (entity && entity.media_url_https) {
          setImage(entity.media_url_https);
          setText(tweet.text.replace(imageUrl, ""));
          return;
        }
      } else if (tweet.entities.urls) {
        let url = turls[0];

        let entity = tweet.entities.urls.find((e) => {
          return e.url === url ? e : null;
        });

        if (entity.expanded_url) {
          console.log(entity.expanded_url);
        }
        // <blockquote class="twitter-tweet">
        //  <p lang="en" dir="ltr">
        //   Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>.
        //   <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a>
        //   <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a>
        //  </p>&mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a>
        // </blockquote>
      }
    }
  }, []);

  return (
    <div
      onClick={() => {
        onClick();
      }}
      className={className}
    >
      <ProfilePreview hide={hide} user={tweet.user} />
      <div className="body">
        <div className="text">{text}</div>
        {image && (
          <div
            className="image"
            style={{ backgroundImage: `url("${image}")` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default styled(Tweet).attrs((props) => ({
  checked: props.checked ? props.checked : false,
}))`
  display: flex;
  flex-flow: column;

  margin: 0.9em;
  border-radius: 0.9em;
  padding: 0.5em;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;

  background-color: ${({ checked, theme }) =>
    checked
      ? checked === "valid"
        ? theme.color.green
        : theme.color.red
      : theme.color.white};

  ${ProfilePreview} {
    font-size: 0.8em;
  }

  .body {
    display: flex;
    flex-flow: column;

    .text {
      padding: 0.2em 0.5em 0.5em 0.5em;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1em;
      line-height: 1em;
    }

    .image {
      background-repeat: no-repeat;
      background-size: cover;
      height: 15em;
      border-radius: 0.9em;
    }
  }
`;

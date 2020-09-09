import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePreview from "./ProfilePreview";
import twitterText from "twitter-text";

const Tweet = ({ className, tweet, onClick }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(tweet.text);

  useEffect(() => {
    const findImages = tweet.text.match(/(https?:\/\/t\.co[^\s]+)/);
    if (findImages && findImages.length && tweet.entities.media) {
      let imageUrl = findImages[0];

      let entity = tweet.entities.media.find((e) => {
        return e.url === imageUrl ? e : null;
      });

      if (entity && entity.media_url_https) {
        setImage(entity.media_url_https);
        setText(tweet.text.replace(imageUrl, ""));
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
      <ProfilePreview user={tweet.user} />
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

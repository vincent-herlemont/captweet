import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePreview from "./ProfilePreview";
import twitterText from "twitter-text";

const Tweet = ({ className, tweet, onClick, hide }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(
    tweet?.v2?.text ? tweet?.v2?.text : tweet.text
  );

  useEffect(() => {
    const turls = tweet.text.match(/(https?:\/\/t\.co[^\s]+)/);
    // TODO ...
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
        {tweet?.v2?.attachments?.media?.length > 0 &&
          tweet.v2.attachments.media[0].url && (
            <div
              className="image"
              style={{
                backgroundImage: `url("${tweet.v2.attachments.media[0].url}")`,
              }}
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

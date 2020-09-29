import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfilePreview from "./ProfilePreview";
import reactStringReplace from "react-string-replace";
import { Capacitor, Plugins } from "@capacitor/core";

const { Browser } = Plugins;

function getImage(tweet) {
  if (!tweet?.v2?.attachments?.media?.length > 0) {
    return "";
  }

  const media = tweet.v2.attachments.media[0];

  return media.url ? media.url : media.preview_image_url;
}

function getReferencedTweet(tweet) {
  if (!(tweet?.v2?.referenced_tweets?.length > 0)) {
    return;
  }

  return tweet?.v2?.referenced_tweets[0]?.data;
}

const TweetLink = ({ href }) => {
  if (Capacitor.isNative) {
    return (
      <a
        onClick={() => {
          Browser.open({ url: href });
        }}
        target="_blank"
      >
        {href}
      </a>
    );
  }

  return (
    <a href={href} target="_blank">
      {href}
    </a>
  );
};

const _Tweet = ({ className, tweet, onClick, hide }) => {
  const text = tweet?.v2?.text ? tweet?.v2?.text : tweet.text;

  const [textHtml, setTextHtml] = useState();

  const image = getImage(tweet);

  const referenced_tweet = getReferencedTweet(tweet);

  useEffect(() => {
    if (hide) {
      const newText = text.replace(/https:\/\/t.co[^\s]+/gi, "");
      setTextHtml(newText);
    } else {
      const newText = reactStringReplace(
        text,
        /(https:\/\/t.co[^\s]+)/gi,
        (match, i) => {
          return <TweetLink key={i} href={match} />;
        }
      );
      setTextHtml(newText);
    }
  }, [hide]);

  return (
    <div
      onClick={(e) => {
        if (e?.target?.tagName !== "A") {
          onClick ? onClick() : null;
        }
      }}
      className={className + " tweet"}
    >
      <ProfilePreview
        hide={hide}
        user={tweet?.user ? tweet?.user : tweet?.author}
      />
      <div className="body">
        <div className="text">{textHtml}</div>
        {image && (
          <div
            className="image"
            style={{
              backgroundImage: `url("${image}")`,
            }}
          ></div>
        )}
        {referenced_tweet && <Tweet tweet={referenced_tweet} />}
      </div>
    </div>
  );
};

const Tweet = styled(_Tweet).attrs((props) => ({
  checked: props.checked ? props.checked : false,
}))`
  display: flex;
  flex-flow: column;

  margin: 0.9em;
  border-radius: 0.9em;
  padding: 0.5em;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  cursor: pointer;

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

      a {
        color: deepskyblue;
      }
    }

    .image {
      background-repeat: no-repeat;
      background-size: cover;
      height: 15em;
      border-radius: 0.9em;
    }

    .tweet {
      margin: 0;
    }
  }
`;

export default Tweet;

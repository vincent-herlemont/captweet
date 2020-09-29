import React, { useContext } from "react";
import styled from "styled-components";
import DataCtx from "../../utils/DataCtx";
import Tweet from "../molecule/Tweet";

const TweetList = ({ className, data: { selected_tweet, tweets } }) => {
  const {
    game: { dispatch },
  } = useContext(DataCtx);

  return (
    <div className={className}>
      {tweets.map((tweet) => (
        <Tweet
          checked={
            selected_tweet.id === tweet.id
              ? selected_tweet.valid
                ? "valid"
                : "error"
              : false
          }
          hide={!selected_tweet.id}
          onClick={() => {
            if (selected_tweet.id) {
              return;
            }
            dispatch({ type: "select_tweet", tweet });
          }}
          key={tweet.id}
          tweet={tweet}
        />
      ))}
    </div>
  );
};

export default styled(TweetList)`
  display: flex;
  flex-direction: column;
  max-width: 30em;
`;

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DataCtx from "../../utils/DataCtx";
import Tweet from "../molecule/Tweet";

const TweetList = ({ className, data: { selected_tweet, tweets } }) => {
  const {
    game: { data, dispatch },
  } = useContext(DataCtx);

  console.log(selected_tweet, tweets);

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
            setTimeout(() => {
              dispatch({ type: "move_quiz", n: 1 });
            }, 3000);
          }}
          key={tweet.id}
          tweet={tweet}
        />
      ))}
    </div>
  );
};

export default styled(TweetList)``;

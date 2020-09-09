import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DataCtx from "../../utils/DataCtx";
import Tweet from "../molecule/Tweet";

const TweetList = ({ className, tweets }) => {
  const {
    game: { dispatch },
  } = useContext(DataCtx);

  return (
    <div className={className}>
      {tweets.map((tweet) => (
        <Tweet
          onClick={() => {
            dispatch({ type: "move_quiz", n: 1 });
          }}
          key={tweet.id}
          tweet={tweet}
        />
      ))}
    </div>
  );
};

export default styled(TweetList)``;

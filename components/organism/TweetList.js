import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DataCtx from "../../utils/DataCtx";

const TweetList = ({ className, tweets }) => {
  console.log(tweets);
  return (
    <div className={className}>
      {tweets.map((t) => (
        <div>{t.id}</div>
      ))}
    </div>
  );
};

export default styled(TweetList)``;

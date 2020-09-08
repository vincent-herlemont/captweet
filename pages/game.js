import React, { useContext, useEffect } from "react";

import styled from "styled-components";
import Head from "next/head";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import DataCtx from "../utils/DataCtx";
import GameHeader from "../components/molecule/GameHeader";
import TweetList from "../components/organism/TweetList";

const Game = ({ className }) => {
  const dataCtx = useContext(DataCtx);
  const { value: targetUser } = dataCtx.game.data.targetUser;

  useEffect(() => {
    console.log("dataCtx.game.data.quiz.value", dataCtx.game.data.quiz.value);
  }, [dataCtx.game.data.quiz.value]);

  return (
    <div className={className}>
      <Head>
        <title>Captweet</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <header>
        <HeaderBar title="captweet" />
      </header>
      <main>
        {targetUser && targetUser.id && (
          <React.Fragment>
            <GameHeader user={targetUser} />
            {dataCtx.game.data.quiz.value.map((value) => {
              return <TweetList tweets={value.tweets} />;
            })}
          </React.Fragment>
        )}
        ... | {targetUser && targetUser.id} |
      </main>
      <footer>footer</footer>
      <FullHeight />
    </div>
  );
};

export default styled(Game)``;

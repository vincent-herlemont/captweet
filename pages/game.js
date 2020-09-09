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
    console.log("dataCtx.game.data", dataCtx.game.data);
  }, [dataCtx.game.data]);

  return (
    <div className={className}>
      <Head>
        <title>Captweet</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <header>
        <HeaderBar
          onClick={() => {
            dataCtx.game.dispatch({ type: "raz" });
          }}
          title="captweet"
        />
      </header>
      <main>
        {targetUser && targetUser.id && (
          <React.Fragment>
            <GameHeader user={targetUser} />
            <button
              onClick={() => {
                dataCtx.game.dispatch({ type: "move_quiz", n: -1 });
              }}
            >
              back
            </button>
            <button
              onClick={() => {
                dataCtx.game.dispatch({ type: "move_quiz", n: 1 });
              }}
            >
              next
            </button>
            {dataCtx.game.data.quiz.value[dataCtx.game.data.quiz.current] && (
              <TweetList
                data={
                  dataCtx.game.data.quiz.value[dataCtx.game.data.quiz.current]
                }
              />
            )}
          </React.Fragment>
        )}
      </main>
      <footer>footer</footer>
      <FullHeight />
    </div>
  );
};

export default styled(Game)``;

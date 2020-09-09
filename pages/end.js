import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import { Plugins } from "@capacitor/core";
import DataCtx from "../utils/DataCtx";

const { Browser } = Plugins;

const Home = ({ className }) => {
  let dataCtx = useContext(DataCtx);

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
          invert={true}
          title="captweet"
        />
      </header>
      <main>
        <div>Are you finish : {dataCtx.game.data.quiz.isEnded}</div>
        <div>Your score : {dataCtx.game.data.quiz.score}</div>
      </main>
      <FullHeight />
    </div>
  );
};

export default styled(Home)`
  height: 100%;
  display: flex;
  flex-flow: column;

  background-color: white;

  main {
    flex: 1;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
`;

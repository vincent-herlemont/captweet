import React, { useContext, useEffect } from "react";

import styled from "styled-components";
import Head from "next/head";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import DataCtx from "../utils/DataCtx";
import { useRouter } from "next/router";
import GameHeader from "../components/molecule/GameHeader";
import TweetList from "../components/organism/TweetList";
import AuthCtx from "../utils/Auth";

const Game = ({ className }) => {
  const dataCtx = useContext(DataCtx);
  const router = useRouter();
  const authCtx = useContext(AuthCtx);

  useEffect(() => {
    const workflow = async () => {
      if (!(await authCtx.isAuthenticated())) {
        return;
      }
      if (!(await dataCtx.game.isStart())) {
        await router.push("/search");
      }
      await dataCtx.game.getTweets(dataCtx.game.targetUser.id);
    };

    workflow();
  }, []);

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
        {dataCtx.game.targetUser && dataCtx.game.targetUser.id && (
          <React.Fragment>
            <GameHeader user={dataCtx.game.targetUser} />
            <TweetList />
          </React.Fragment>
        )}
        ... | {dataCtx.game.targetUser && dataCtx.game.targetUser.id} |
      </main>
      <footer>footer</footer>
      <FullHeight />
    </div>
  );
};

export default styled(Game)``;

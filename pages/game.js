import { useContext, useEffect } from "react";

import styled from "styled-components";
import Head from "next/head";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import DataCtx from "../utils/DataCtx";
import { useRouter } from "next/router";

const Game = ({ className }) => {
  let dataCtx = useContext(DataCtx);
  let router = useRouter();

  useEffect(() => {
    const workflow = async () => {
      if (!(await dataCtx.game.isStart())) {
        await router.push("/search");
      }

      console.log(dataCtx.game);
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
        ... | {dataCtx.game.targetUser && dataCtx.game.targetUser.id} |
      </main>
      <footer>footer</footer>
      <FullHeight />
    </div>
  );
};

export default styled(Game)``;

import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import Head from "next/head";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import DataCtx from "../utils/DataCtx";
import GameHeader from "../components/molecule/GameHeader";
import TweetList from "../components/organism/TweetList";
import FooterBar from "../components/organism/FooterBar";
import Button from "../components/atom/Button";

const Game = ({ className }) => {
  const dataCtx = useContext(DataCtx);
  const { value: targetUser } = dataCtx.game.data.targetUser;

  const [displayFooter, setDisplayFooter] = useState(false);

  useEffect(() => {
    const data = dataCtx.game.data;
    const current = data.quiz.current;
    const value = data.quiz.value;
    if (value[current] && value[current]?.selected_tweet?.id) {
      setDisplayFooter(true);
    } else {
      setDisplayFooter(false);
    }
  }, [dataCtx.game.data]);
  return (
    <div className={className}>
      <Head>
        <title>Captweet</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
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
            {dataCtx.game.data.quiz.value[dataCtx.game.data.quiz.current] ? (
              <div className={"tweetlist-center"}>
                <TweetList
                  data={
                    dataCtx.game.data.quiz.value[dataCtx.game.data.quiz.current]
                  }
                />
              </div>
            ) : (
              <div className={"loading"}>loading ...</div>
            )}
          </React.Fragment>
        )}
      </main>
      <footer>
        {displayFooter && (
          <FooterBar>
            <Button
              text={"👉 continue"}
              onClick={() => {
                dataCtx.game.dispatch({ type: "move_quiz", n: 1 });
                window.scrollTo(0, 0);
              }}
            />
          </FooterBar>
        )}
      </footer>
      <FullHeight />
    </div>
  );
};

export default styled(Game)`
  header {
    position: fixed;
    width: 100%;
    top: 0;
  }

  main {
    margin-top: 4em;
    margin-bottom: 4em;
    width: 100%;

    .tweetlist-center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .loading {
      text-align: center;
    }
  }

  footer {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
`;

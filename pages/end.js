import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styled, { useTheme } from "styled-components";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import { Capacitor, Plugins } from "@capacitor/core";
import DataCtx from "../utils/DataCtx";
import CloudBackground from "../components/atom/CloudBackground";
import ProfilePic from "../components/atom/ProfilePic";
import Button from "../components/atom/Button";

const { Share } = Plugins;

const Home = ({ className }) => {
  let dataCtx = useContext(DataCtx);
  const { value: targetUser } = dataCtx.game.data.targetUser;

  const theme = useTheme();

  const [style, setStyle] = useState({ marginBottom: "" });
  useEffect(() => {
    let h = window.innerHeight;
    setStyle({ marginBottom: `${h / 7}px` });
  }, []);

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
        <CloudBackground urlProfileImage={targetUser.profile_image_url_https} />
        <div className={"content"}></div>
      </main>
      <footer>
        <div className={"main"} style={style}>
          <ProfilePic
            url={targetUser.profile_image_url_https}
            size={10}
            borderColor={theme.color.twitter_blue}
          />
          <div className={"text"}>{targetUser.name} CATCHED !!!</div>
          <div className={"score"}>
            {dataCtx.game.data.quiz.score}/{dataCtx.game.data.quiz.value.length}
          </div>
          <div className={"score"}></div>
          <Button
            onClick={() => {
              dataCtx.game.dispatch({ type: "raz" });
            }}
            text={"Back"}
          />
        </div>
        <div
          onClick={() => {
            if (Capacitor.isNative) {
              Share.share({
                title: "Captweet",
                text: `${targetUser.name} catched !!!`,
                url: "https://captweet.vercel.app/",
                dialogTitle: "Share your score !!!",
              });
            }
          }}
          className={"footer"}
        >
          <img src="/img/share/facebook.svg" />
          <img src="/img/share/instagram.svg" />
          <img src="/img/share/snapchat.png" />
          <img src="/img/share/twitter.svg" />
          <img src="/img/share/share.svg" />
        </div>
      </footer>
      <FullHeight />
    </div>
  );
};

export default styled(Home)`
  header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 99;
  }

  height: 100%;
  display: flex;
  flex-flow: column;

  background-color: white;

  main {
    margin-top: 4em;
    flex: 1;
    position: relative;

    ${CloudBackground} {
      position: relative;
      height: 100%;
    }
  }

  footer {
    position: fixed;
    display: flex;

    flex-direction: column;
    left: 0;
    bottom: 0;

    width: 100%;

    .main {
      position: relative;
      top: -50%;
      z-index: 99;

      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;

      .text {
        text-align: center;
        color: ${(props) => props.theme.color.dark_blue};
        font-family: Roboto;
        font-style: normal;
        font-weight: 900;
        font-size: 2em;
        mix-blend-mode: screen;
        width: 70vw;
      }

      .score {
        padding: 1em;
        letter-spacing: 0.2em;
        color: ${(props) => props.theme.color.dark_blue};
        font-size: 1.5em;
      }
    }

    .footer {
      display: flex;
      flex-flow: row;
      justify-content: space-evenly;

      width: 100%;
      padding: 2em;
      img {
        height: 40px;
        width: 40px;
      }
    }
  }
`;

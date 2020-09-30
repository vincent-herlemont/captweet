import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import TwitterCfg from "../utils/TwitterCfg";
import { Url } from "../utils/Api";
import { useRouter } from "next/router";
import AuthCtx from "../utils/Auth";
import { Capacitor, Plugins } from "@capacitor/core";
import FlatButton from "../components/atom/FlatButton";
import openLink from "../utils/openLink";

const { Browser } = Plugins;

const Home = ({ className }) => {
  let authCtx = useContext(AuthCtx);

  let [twitterAuthorizeUrl, setTwitterAuthorizeUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const workflow = async () => {
      if (authCtx.token.status) {
        await router.push("/search");
        return;
      }
      fetch(Url("api/twitter-auth"), {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isNative: Capacitor.isNative,
        }),
      }).then((response) => {
        response.json().then((data) => {
          let url =
            TwitterCfg.authorize_url + "?oauth_token=" + data.oauth_token;
          setTwitterAuthorizeUrl(url);
        });
      });
    };

    workflow();
  }, [authCtx.token]);

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
        <div className={"logo"} />
        <div>
          <FlatButton
            onClick={() => openLink(twitterAuthorizeUrl)}
            text={"Login with twitter"}
            loading={!twitterAuthorizeUrl}
          />
          <div className={"condition"}>
            This is an open source software so you can found{" "}
            <a
              target="_blank"
              href={"https://github.com/vincent-herlemont/captweet"}
            >
              the source code on Github
            </a>
            .
          </div>
        </div>
      </main>
      <footer></footer>
      <FullHeight />
    </div>
  );
};

export default styled(Home)`
  height: 100%;
  display: flex;
  flex-flow: column;

  background: linear-gradient(
      180deg,
      ${(props) => props.theme.color.dark_blue} 13.02%,
      ${(props) => props.theme.color.twitter_blue} 94.79%
    ),
    #ffffff;
  background-repeat: no-repeat;
  background-attachment: fixed;

  main {
    flex: 1;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 1em;

    .logo {
      height: 20%;
      width: 70%;

      background-image: url("/img/logo_twitter.png");
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(4px);
      margin: 0 0 2em 0;
    }

    ${FlatButton} {
      margin: 0 0 1em 0;
    }

    .condition {
      color: white;
      text-align: center;

      a {
        text-decoration: underline;
      }
    }
  }

  footer {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
`;

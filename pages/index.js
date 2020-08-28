import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import SearchCtx from "../utils/SearchCtx";
import TwitterCfg from "../utils/TwitterCfg";

const Home = ({ className }) => {
  let [search, setSearch] = useContext(SearchCtx);
  let [twitterAuthorizeUrl, setTwitterAuthorizeUrl] = useState(null);

  useEffect(() => {
    fetch("/api/twitter_auth", { method: "POST" }).then((response) => {
      console.log(response);
      response.json().then((data) => {
        console.log(data);
        let url = TwitterCfg.authorize_url + "?oauth_token=" + data.oauth_token;
        setTwitterAuthorizeUrl(url);
      });
    });
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
        <div className="login">Login container</div>
        <div>
          <input
            type="text"
            value={search}
            onFocus={() => setSearch("")}
            onChange={(e) => setSearch(e.target.value)}
          />
          {twitterAuthorizeUrl && <a href={twitterAuthorizeUrl}>Search</a>}
        </div>
      </main>
      <footer>footer</footer>
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
  }

  footer {
  }
`;

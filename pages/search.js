import { useContext, useEffect } from "react";
import Head from "next/head";
import styled, { useTheme } from "styled-components";
import FullHeight from "../styles/fullheight";
import SearchCtx from "../utils/SearchCtx";
import HeaderBar from "../components/organism/HeaderBar";
import qs from "qs";
import TwitterCfg from "../utils/TwitterCfg";

const Search = ({ className }) => {
  const [search] = useContext(SearchCtx);
  const theme = useTheme();

  useEffect(() => {
    fetch("/api/twitter_following" + window.location.search, {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
  }, []);
  return (
    <div className={className}>
      <Head>
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <header>
        <HeaderBar invert={true} title="captweet" />
      </header>
      <main>Search : {search}</main>
      <footer>footer</footer>
      <FullHeight />
    </div>
  );
};

export default styled(Search)`
  height: 100%;
  display: flex;
  flex-flow: column;

  main {
    color: white;
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer {
  }
`;

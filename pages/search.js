import { useContext, useEffect } from "react";
import Head from "next/head";
import styled, { useTheme } from "styled-components";
import FullHeight from "../styles/fullheight";
import SearchCtx from "../utils/SearchCtx";
import HeaderBar from "../components/organism/HeaderBar";
import { Url } from "../utils/Api";
import { useState } from "react";

const Search = ({ className }) => {
  const [search] = useContext(SearchCtx);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(Url("api/twitter-following" + window.location.search), {
      method: "GET",
      mode: "cors",
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setData(data);
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
      <main>
        Search : {search} -> <pre>{JSON.stringify(data, 0, 1)}</pre>
      </main>
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
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    pre {
      font-size: 10px;
      text-overflow: clip;
      width: 100px;
    }
  }

  footer {
  }
`;

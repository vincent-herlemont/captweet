import { useContext, useEffect } from "react";
import Head from "next/head";
import styled, { useTheme } from "styled-components";
import FullHeight from "../styles/fullheight";
import SearchCtx from "../utils/SearchCtx";
import HeaderBar from "../components/organism/HeaderBar";
import { Url } from "../utils/Api";
import { useState } from "react";
import { Plugins } from "@capacitor/core";
import AuthCtx from "../utils/Auth";
const { Storage } = Plugins;

const Search = ({ className }) => {
  const [search] = useContext(SearchCtx);
  const authCtx = useContext(AuthCtx);
  const [data, setData] = useState(null);

  useEffect(() => {
    const workflow = async () => {
      if (await authCtx.isAuthenticated()) {
        return;
      }
      fetch(Url("api/twitter-user-tokens" + window.location.search), {
        method: "GET",
        mode: "cors",
      }).then((response) => {
        response.json().then((data) => {
          if (data.status === "OK") {
            authCtx.saveSession(data.value);
          } else {
            console.error("fail to log", data);
          }
        });
      });
    };

    workflow();
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
        <button
          onClick={() => {
            authCtx.removeSession();
          }}
        >
          X
        </button>
        <div>{authCtx.token.status ? "true" : "false"}</div>
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

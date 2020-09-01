import { useContext, useEffect } from "react";
import Head from "next/head";
import styled, { useTheme } from "styled-components";
import FullHeight from "../styles/fullheight";
import HeaderBar from "../components/organism/HeaderBar";
import { Url } from "../utils/Api";
import { useState } from "react";
import { Capacitor, Plugins } from "@capacitor/core";
import AuthCtx from "../utils/Auth";
import TwitterCfg from "../utils/TwitterCfg";
import UserList from "../components/organism/UserList";
const { Storage } = Plugins;

const Search = ({ className }) => {
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

  useEffect(() => {
    const workflow = async () => {
      if (!(authCtx.token && authCtx.token.status)) {
        console.log("can not do that");
        return;
      }

      console.log(authCtx.token.value);

      fetch(Url("api/twitter-following"), {
        method: "POST",
        mode: "cors",
        headers: authCtx.token.value,
      }).then((response) => {
        response.json().then((data) => {
          console.log("data", data);
        });
      });
    };

    workflow();
  }, [authCtx]);

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
        <UserList />
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

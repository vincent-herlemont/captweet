import { useContext, useEffect } from "react";
import Head from "next/head";
import styled, { useTheme } from "styled-components";
import FullHeight from "../styles/fullheight";
import HeaderBar from "../components/organism/HeaderBar";
import { Url } from "../utils/Api";
import { useState } from "react";
import { useRouter } from "next/router";
import { Capacitor, Plugins } from "@capacitor/core";
import AuthCtx from "../utils/Auth";
import UserList from "../components/organism/UserList";
import DataCtx from "../utils/DataCtx";
const { Storage } = Plugins;

const Search = ({ className }) => {
  const authCtx = useContext(AuthCtx);
  const router = useRouter();
  const dataCtx = useContext(DataCtx);

  useEffect(() => {
    const workflow = async () => {
      const { status, loading, saveSession } = authCtx.token;
      console.log(status, loading);
      if (!status && !loading) {
        await router.push("/");
        return;
      }

      // if (await authCtx.isAuthenticated()) {
      //   if (await dataCtx.game.isStart()) {
      //     await router.push("/game");
      //   }
      //   return;
      // }
    };

    workflow();
  }, [authCtx.token]);

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

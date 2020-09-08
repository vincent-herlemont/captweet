import { useContext, useEffect } from "react";
import Head from "next/head";
import styled, { useTheme } from "styled-components";
import FullHeight from "../styles/fullheight";
import HeaderBar from "../components/organism/HeaderBar";
import UserList from "../components/organism/UserList";

const Search = ({ className }) => {
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

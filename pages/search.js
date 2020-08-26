import { useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import FullHeight from "../styles/fullheight";
import SearchCtx from "../utils/SearchCtx";

const Search = ({ className }) => {
  const [search] = useContext(SearchCtx);

  return (
    <div className={className}>
      <Head>
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <header>header</header>
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

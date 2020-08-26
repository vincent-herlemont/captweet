import { useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";
import { useRouter } from "next/router";
import SearchCtx from "../utils/SearchCtx";

const Home = ({ className }) => {
  const router = useRouter();
  let [search, setSearch] = useContext(SearchCtx);

  return (
    <div className={className}>
      <Head>
        <title>Captweet</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <header>
        <HeaderBar />
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
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("search");
            }}
          >
            Search
          </button>
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

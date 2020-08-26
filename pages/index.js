import Head from "next/head";
import styled from "styled-components";
import HeaderBar from "../components/organism/HeaderBar";
import FullHeight from "../styles/fullheight";

const Home = ({ className }) => {
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
    justify-content: center;
    align-items: center;
  }

  footer {
  }
`;

import Head from "next/head";
import styled from "styled-components";
import Logo from "../components/atom/Logo";
import Title from "../components/atom/Title";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Captweet</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main>
        <Logo />
        <Title>Capteet</Title>
      </main>

      <footer></footer>
    </div>
  );
}

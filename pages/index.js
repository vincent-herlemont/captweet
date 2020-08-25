import Head from 'next/head'
import styled from 'styled-components';

const Title = styled.h1`
  color: ${(props) => props.theme.color.yellow};
`

export default function Home() {
  return (
    <div>
     <Head>
      <title>Captweet</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json"/>
     </Head>

      <main>
        <Title>Capteet</Title>
        <div>Static CSS Test</div>
      </main>

      <footer>
      </footer>
    </div>
  )
}

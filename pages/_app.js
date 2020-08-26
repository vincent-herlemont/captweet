import "../styles/globals.css";
import theme from "../styles/theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { SearchCtxProvider } from "../utils/SearchCtx";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(180deg, ${(props) =>
      props.theme.color.dark_blue} 13.02%, ${(props) =>
  props.theme.color.twitter_blue} 94.79%), #FFFFFF;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    src: url(/fonts/static/RobotoSlab-Bold.ttf) format('woff2');
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <SearchCtxProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </SearchCtxProvider>
    </ThemeProvider>
  );
}

export default MyApp;

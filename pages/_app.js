import "../styles/globals.css";
import theme from "../styles/theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";

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
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;

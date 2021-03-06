import "../styles/globals.css";
import theme from "../styles/theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AuthCtxProvider } from "../utils/Auth";
import { DataCtxProvider } from "../utils/DataCtx";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    src: url(/fonts/roboto_slab/static/RobotoSlab-Bold.ttf) format('woff2');
  }
  
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: url(/fonts/roboto/Roboto-Bold.ttf) format('woff2');
  }
  
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(/fonts/roboto/Roboto-Regular.ttf) format('woff2');
  }
  
    @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: url(/fonts/roboto/Roboto-Bold.ttf) format('woff2');
  }
  
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 100;
    src: url(/fonts/roboto/Roboto-Thin.ttf) format('woff2');
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthCtxProvider>
        <DataCtxProvider>
          <Component {...pageProps} />
          <GlobalStyle />
        </DataCtxProvider>
      </AuthCtxProvider>
    </ThemeProvider>
  );
}

export default MyApp;

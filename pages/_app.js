import "../styles/globals.css";
import theme from "../styles/theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { Plugins } from "@capacitor/core";
const { App: CapApp } = Plugins;
import { useRouter } from "next/router";
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
    font-weight: 200;
    src: url(/fonts/roboto/Roboto-Light.ttf) format('woff2');
  }
`;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    CapApp.addListener("appUrlOpen", (data) => {
      // Example url: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      console.log("appUrlOpen", data);
      const slug = data.url.split(".app").pop();
      if (slug && slug !== "/") {
        router.replace(slug);
      }
      // If no match, do nothing - let regular routing
      // logic take over
    });
  }, []);
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

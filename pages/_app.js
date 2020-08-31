import "../styles/globals.css";
import theme from "../styles/theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { SearchCtxProvider } from "../utils/SearchCtx";
import { useEffect } from "react";
import { Plugins } from "@capacitor/core";
const { App: CapApp } = Plugins;
import { useRouter } from "next/router";
import { AuthCtxProvider } from "../utils/Auth";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    src: url(/fonts/static/RobotoSlab-Bold.ttf) format('woff2');
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
        <SearchCtxProvider>
          <Component {...pageProps} />
          <GlobalStyle />
        </SearchCtxProvider>
      </AuthCtxProvider>
    </ThemeProvider>
  );
}

export default MyApp;

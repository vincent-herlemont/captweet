import '../styles/globals.css'
import theme from '../styles/theme'
import {ThemeProvider} from "styled-components";


function MyApp({ Component, pageProps }) {
  
  console.log(theme);
  return <ThemeProvider theme={theme} >
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp

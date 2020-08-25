import Document, { Html, Head, Main, NextScript } from 'next/document'
import theme from "../styles/theme";

class MyDocument extends Document {
 static async getInitialProps(ctx) {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
 }
 
 render() {
  return (
   <Html>
    <Head />
    <body color={theme.color.dark_blue}>
    <Main />
    <NextScript />
    </body>
   </Html>
  )
 }
}

export default MyDocument
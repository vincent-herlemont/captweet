// Global style that allow to display NextJs page as full height
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html,
body,
body > div:first-child,
div#__next,
div#__next > div,
div#__next > div > div {
  height: 100%;
}
`;

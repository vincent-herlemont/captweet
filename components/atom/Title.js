import React from "react";
import styled from "styled-components";

const Title = ({ className }) => {
  return <h1 className={className}>captweet</h1>;
};

export default styled(Title)`
  color: ${(props) => props.theme.color.yellow};
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: 900;
  font-size: 1.75em;
  margin: 0;
  padding: 0;
`;

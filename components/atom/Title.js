import React from "react";
import styled from "styled-components";

const Title = ({ className, children }) => {
  return <h1 className={className}>{children}</h1>;
};

export default styled(Title).attrs((props) => ({
  color: props.color || props.theme.color.yellow,
}))`
  color: ${(props) => props.color};
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: 900;
  font-size: 1.75em;
  margin: 0;
  padding: 0;
`;

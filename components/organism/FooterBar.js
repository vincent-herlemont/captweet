import React from "react";
import styled from "styled-components";

const FooterBar = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(FooterBar)`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  height: 4em;
  background-color: ${(props) => props.theme.color.yellow};
`;

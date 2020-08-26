import React from "react";
import styled from "styled-components";
import Logo from "../atom/Logo";
import Title from "../atom/Title";

const HeaderBar = ({ className }) => {
  return (
    <div className={className}>
      <div className="fix">
        <Logo />
      </div>
      <Title />
    </div>
  );
};

export default styled(HeaderBar)`
  display: flex;
  flex-flow: row;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 4em;

  .fix {
    position: absolute;
    height: 4em;
    width: 4em;

    display: flex;
    align-items: center;
    justify-content: center;

    ${Logo} {
      height: 2.5em;
      width: 2.5em;
    }

    left: 0;
  }

  ${Title} {
    flex: 1;
    text-align: center;
  }
`;

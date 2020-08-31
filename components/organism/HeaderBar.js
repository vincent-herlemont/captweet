import React from "react";
import styled from "styled-components";
import Logo from "../atom/Logo";
import Title from "../atom/Title";
import { useRouter } from "next/router";

const HeaderBar = ({ className, title }) => {
  const router = useRouter();

  return (
    <div className={className}>
      <div
        onClick={() => {
          router.push("/");
        }}
        className="fix"
      >
        <Logo />
      </div>

      <Title>{title}</Title>
    </div>
  );
};

export default styled(HeaderBar).attrs((props) => ({
  color: props.invert ? props.theme.color.dark_blue : props.theme.color.yellow,
  backgroundColor: props.invert
    ? props.theme.color.yellow
    : props.theme.color.dark_blue,
}))`
  display: flex;
  flex-flow: row;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 4em;

  background-color: ${(props) => props.backgroundColor};

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
    color: ${(props) => props.color};
    flex: 1;
    text-align: center;
  }
`;

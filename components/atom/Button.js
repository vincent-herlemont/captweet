import React from "react";
import styled from "styled-components";

const Button = ({ className, text, onClick }) => {
  return (
    <div
      className={className}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </div>
  );
};

export default styled(Button)`
  color: ${(props) => props.theme.color.yellow};
  background-color: ${(props) => props.theme.color.dark_blue};
  border: 2px solid ${(props) => props.theme.color.dark_blue};
  padding: 0.2em 1em 0.2em 1em;
  border-radius: 10px;
  font-family: "Roboto";
  font-weight: 700;
  font-size: 1.6em;
  cursor: pointer;
`;

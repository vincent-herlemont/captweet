import React from "react";
import styled from "styled-components";

const FlatButton = ({ className, text, onClick, loading }) => {
  return (
    <div
      onClick={() => {
        if (!loading) {
          onClick();
        }
      }}
      className={className}
    >
      {!loading && text}
    </div>
  );
};

export default styled(FlatButton)`
  background-color: ${(props) => props.theme.color.twitter_blue};
  padding: 1.25em 4em 1.25em 4em;
  text-transform: uppercase;
  border-radius: 3em;
  color: white;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;

  ${(props) => {
    if (props.loading) {
      return `
        
        background-image: url("/img/rolling.gif");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      `;
    } else {
      return `
       cursor: pointer;
       `;
    }
  }};

  height: 3.75em;
  text-align: center;
`;

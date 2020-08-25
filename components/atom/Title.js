import React from 'react';
import styled from "styled-components";

const Title = ({className}) => {
    return <div className={className}>
     <h1>captweet</h1>
    </div>
}

export default styled(Title)`
color: ${(props) => props.theme.color.yellow};
font-family: Roboto Slab;
font-style: normal;
font-weight: 900;
font-size: 28px;
line-height: 37px;
`;
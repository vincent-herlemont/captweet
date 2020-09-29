import React from "react";
import styled from "styled-components";
import ProfilePreview from "./ProfilePreview";

const UserItem = ({ user, className, onClick }) => {
  return (
    <div className={className} onClick={() => onClick(user)}>
      <ProfilePreview user={user} />
      <div className={"target"} />
    </div>
  );
};

export default styled(UserItem)`
  display: flex;
  width: 100%;
  flex-flow: row;
  cursor: pointer;

  ${ProfilePreview} {
    flex: 1;
  }

  .target {
    background-image: url("/img/target.svg");
    background-repeat: no-repeat;
    background-position: center;
    height: 3em;
    width: 3em;
    margin: 0.5em;
  }
`;

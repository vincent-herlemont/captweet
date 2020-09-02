import React from "react";
import styled from "styled-components";
import ProfilePic from "../atom/ProfilePic";
import ProfilePreview from "./ProfilePreview";

const UserItem = ({ user, className }) => {
  return (
    <div className={className}>
      <ProfilePreview user={user} />
      <div>X</div>
    </div>
  );
};

export default styled(UserItem)`
  display: flex;
  width: 100%;
  flex-flow: row;

  ${ProfilePreview} {
    flex: 1;
  }
`;

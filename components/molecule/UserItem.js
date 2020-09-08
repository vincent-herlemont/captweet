import React from "react";
import styled from "styled-components";
import ProfilePreview from "./ProfilePreview";

const UserItem = ({ user, className, onClick }) => {
  return (
    <div className={className} onClick={() => onClick(user)}>
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

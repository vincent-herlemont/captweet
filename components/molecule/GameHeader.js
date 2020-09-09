import React from "react";
import styled from "styled-components";
import ProfilePic from "../atom/ProfilePic";

const GameHeader = ({ className, user }) => {
  return (
    <div className={className}>
      <div className="question">Find {user.name}'s tweet !</div>
      <div className="profile_pic">
        <ProfilePic url={user.profile_image_url_https} size={7} />
      </div>
    </div>
  );
};

export default styled(GameHeader)`
  display: flex;
  align-items: center;

  color: white;

  background: radial-gradient(
      90.58% 90.58% at 48.56% 0%,
      #052b52 0%,
      rgba(5, 43, 82, 0) 100%
    ),
    linear-gradient(126.89deg, #052b52 17.65%, rgba(5, 43, 82, 0) 84.75%),
    url(${({ user }) => user.profile_banner_url});
  background-position: center center;
  background-size: cover;
  border-radius: 0px 0px 0.9em 0.9em;

  .question {
    align-self: flex-end;
    padding: 1em 0 1em 1em;
    font-family: Roboto;
    font-style: normal;
    font-weight: 200;
    font-size: 2em;
    flex: 1;
    overflow-wrap: anywhere;
  }

  .profile_pic {
    margin-left: 1em;
    margin-right: 1em;
  }
`;

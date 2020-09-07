import React from "react";
import styled from "styled-components";
import ProfilePic from "../atom/ProfilePic";
import theme from "../../styles/theme";

const ProfilePreview = ({ user, className }) => {
  return (
    <div className={className}>
      <ProfilePic url={user.profile_image_url_https} />
      <div>
        <div class="name">
          <div>{user.name}</div>
          {user.verified && <img src="/img/verified_logo.svg" />}
        </div>
        <div class="screen_name">@{user.screen_name}</div>
      </div>
    </div>
  );
};

export default styled(ProfilePreview)`
  display: flex;
  padding: 0.3em;

  .name {
    display: flex;
    align-items: center;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 1em;
    line-height: 1em;
    padding: 0.3em;

    img {
      padding: 0.3em;
    }
  }

  .screen_name {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 1em;
    line-height: 1em;
    padding: 0.3em;
    color: ${(props) => props.theme.color.gary};
  }
`;

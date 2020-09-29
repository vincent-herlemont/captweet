import React from "react";

const ProfilePic = ({ url, size = 3, border = 0, borderColor = "#FFFFFF" }) => {
  let style = {
    width: `${size}em`,
    height: `${size}em`,
    backgroundColor: "#d7d7d7",
    borderRadius: `${size / 2}em`,
    margin: "0.3em",
    backgroundSize: `${size}em ${size}em`,
    border: `${size / 30}em solid ${borderColor}`,
  };

  if (url) {
    delete style.backgroundColor;
    url = profilePicUrlReasonablySmall(url);
    style.backgroundImage = `url("${url}")`;
    style.backgroundPosition = "center";
  }

  return <div style={style} />;
};

export const profilePicUrlReasonablySmall = (profile_image_url_https) => {
  return profile_image_url_https.replace("_normal", "_reasonably_small");
};

export default ProfilePic;

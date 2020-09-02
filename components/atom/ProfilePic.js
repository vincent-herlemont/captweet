import React from "react";

const ProfilePic = ({ url, size = 3 }) => {
  let style = {
    width: `${size}em`,
    height: `${size}em`,
    backgroundColor: "#d7d7d7",
    borderRadius: `${size / 2}em`,
    margin: "0.3em",
    backgroundSize: `${size}em ${size}em`,
  };

  if (url) {
    delete style.backgroundColor;
    url = url.replace("_normal", "_reasonably_small");
    style.backgroundImage = `url("${url}")`;
  }

  return <div style={style} />;
};

export default ProfilePic;

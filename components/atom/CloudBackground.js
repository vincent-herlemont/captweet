import React, { useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import _ from "lodash";
import { profilePicUrlReasonablySmall } from "./ProfilePic";

const CloudBackground = ({ className, urlProfileImage }) => {
  const canvasRef = useRef(null);

  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;

    let cloudImage = new Image();
    cloudImage.src = "/img/cloud.png";

    let twitterImage = new Image();
    twitterImage.src = "/img/logo_twitter.png";

    let profileImage = new Image();
    profileImage.src = urlProfileImage
      ? profilePicUrlReasonablySmall(urlProfileImage)
      : "/img/catex_example_reasonably_small.jpg";

    let dpi = window.devicePixelRatio;
    function fix_dpi(canvas) {
      let style_height = +getComputedStyle(canvas)
        .getPropertyValue("height")
        .slice(0, -2);
      let style_width = +getComputedStyle(canvas)
        .getPropertyValue("width")
        .slice(0, -2);
      canvas.setAttribute("height", style_height * dpi);
      canvas.setAttribute("width", style_width * dpi);
    }
    fix_dpi(canvas);

    let clouds = [];
    for (let i = 0; i < 200; i++) {
      let t = _.random(6, 20);
      clouds.push({
        size: _.random(50, 250),
        startTimeX: _.random(0, t),
        y: _.random(0, canvas.height),
        t,
      });
    }

    function drawTranslateElements(now, ctx, infos) {
      infos = Object.assign(
        { size: 200, startTimeX: 0, y: 200, img: cloudImage, t: 6 },
        infos
      );
      let s = now.getSeconds() + infos.startTimeX;
      let ms = now.getMilliseconds();
      const nbSeconds = infos.t;
      const dps = (canvas.width + infos.size * 20) / nbSeconds;
      const dpms = dps / 1000;
      const currentT = (s * 1000 + ms) % (infos.t * 1000);

      const position = (currentT - dpms * infos.size * 20) * dpms;

      ctx.drawImage(infos.img, position, infos.y, infos.size, infos.size);
    }

    function draw() {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(1, 1);
      let now = new Date();

      for (let cloud of clouds) {
        drawTranslateElements(now, ctx, cloud);
      }

      ctx.restore();

      window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

CloudBackground.getInitialProps = async () => {
  return {};
};

export default styled(CloudBackground)`
  width: 100%;
  height: 100%;
`;

import { Capacitor } from "@capacitor/core";
import getConfig from "next/config";
import { useContext } from "react";
import AuthCtx from "./Auth";
const { publicRuntimeConfig } = getConfig();

// Set foreign api_origin when we are in native app mode.
export function Url(path) {
  let origin = Capacitor.isNative ? publicRuntimeConfig.api_origin : "";
  return origin + "/" + path;
}

export const useRequest = function () {
  const authCtx = useContext(AuthCtx);

  return async (url) => {
    if (!(authCtx.token && authCtx.token.status)) {
      console.log("can not do that", authCtx.token);
      return;
    }
    console.info("Get data from ", url);
    return await fetch(Url(url), {
      method: "GET",
      mode: "cors",
      headers: {
        user_id: authCtx.token.value.user_id,
        oauth_token: authCtx.token.value.oauth_token,
        oauth_token_secret: authCtx.token.value.oauth_token_secret,
      },
    }).then((response) => {
      return response.json().then((data) => {
        return data;
      });
    });
  };
};

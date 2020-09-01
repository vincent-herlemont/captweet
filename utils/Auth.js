const STORAGE_KEY = "user_data";
import { Plugins } from "@capacitor/core";
import React, { useState } from "react";

const { Storage } = Plugins;

const AuthCtx = React.createContext({ token: { status: false } });
export default AuthCtx;

export const AuthCtxProvider = ({ children }) => {
  const [oauthTokens, setOauthTokens] = useState({ children });

  const auth = {
    token: oauthTokens,
    fetchData: async function () {
      const ret = await Storage.get({ key: STORAGE_KEY });
      try {
        let value = JSON.parse(ret.value);
        if (value.oauth_token && value.oauth_token_secret) {
          let token = { status: true, value };
          setOauthTokens({ status: true, value });
          return token;
        }
      } catch (e) {
        console.error("fail to load session from local storage");
      }
    },
    saveSession: async function (data) {
      await Storage.set({
        key: STORAGE_KEY,
        value: JSON.stringify(data),
      });
      await this.fetchData();
      console.info("save session ok", data);
    },

    isAuthenticated: async function () {
      let token = await this.fetchData();
      return token ? token.status : false;
    },
    removeSession: async function () {
      await Storage.remove({ key: STORAGE_KEY });
      setOauthTokens({ status: false });
    },
  };

  return <AuthCtx.Provider value={auth}>{children}</AuthCtx.Provider>;
};

import { Url } from "./Api";

const STORAGE_KEY = "user_data";
import { Plugins } from "@capacitor/core";
import React, { useState, useEffect } from "react";
const { Storage } = Plugins;

const defaultValues = { status: false, loading: true };
const AuthCtx = React.createContext(defaultValues);
export default AuthCtx;

export const AuthCtxProvider = ({ children }) => {
  const [oauthTokens, setOauthTokens] = useState(defaultValues);

  async function removeUrlData() {
    window.history.pushState(
      {},
      window.document.title,
      "/" +
        window.location.href
          .substring(window.location.href.lastIndexOf("/") + 1)
          .split("?")[0]
    );
  }

  async function trySaveSession() {
    if (window.location.search.match(/auth_token.+oauth_verifier/) == null) {
      return;
    }
    await fetch(Url("api/twitter-user-tokens" + window.location.search), {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json().then((data) => {
          if (data.status === "OK") {
            return data.value;
          } else {
            console.error("fail to log", data);
          }
        });
      })
      .then((value) => {
        value = JSON.stringify(value);
        if (!value) {
          console.error(`fail to parse server response ${value}`);
          return;
        }
        Storage.set({
          key: STORAGE_KEY,
          value: value,
        });
        console.info("save session ok", value);
      })
      .finally(() => {
        return removeUrlData();
      });
  }

  async function removeSession() {
    await Storage.remove({ key: STORAGE_KEY });
    setOauthTokens({ status: false, loading: false });
  }

  async function fetchDataFromLocalStorage() {
    const ret = await Storage.get({ key: STORAGE_KEY });
    try {
      let value = JSON.parse(ret.value);
      if (value.oauth_token && value.oauth_token_secret) {
        let token = { status: true, value };
        setOauthTokens({ status: true, loading: false, value });
        return token;
      }
    } catch (e) {
      console.error("fail to load session from local storage", e);
      setOauthTokens({ status: false, loading: false });
    }
  }

  const auth = {
    token: oauthTokens,
    removeSession,
  };

  useEffect(() => {
    const actions = async () => {
      await trySaveSession();
      await fetchDataFromLocalStorage();
    };

    actions();
  }, []);

  return <AuthCtx.Provider value={auth}>{children}</AuthCtx.Provider>;
};

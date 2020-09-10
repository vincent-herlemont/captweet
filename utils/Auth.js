import { Url } from "./Api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Plugins } from "@capacitor/core";
import { Capacitor } from "@capacitor/core";
const { App: CapApp } = Plugins;

const { Storage } = Plugins;
const defaultValues = { status: false, loading: true };
const AuthCtx = React.createContext(defaultValues);

export default AuthCtx;

const STORAGE_KEY = "user_data";

export const AuthCtxProvider = ({ children }) => {
  const [oauthTokens, setOauthTokens] = useState(defaultValues);
  const router = useRouter();

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

  async function trySaveSession(locationSearch) {
    locationSearch = locationSearch
      ? locationSearch
      : window.location.search.match(/auth_token.+oauth_verifier/)
      ? window.location.search
      : null;
    if (locationSearch == null) {
      console.error(";''''(");
      return;
    }
    await fetch(Url("api/twitter-user-tokens" + locationSearch), {
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

  const authenticateWorkflow = async (locationSearch) => {
    await trySaveSession(locationSearch);
    await fetchDataFromLocalStorage();
  };

  useEffect(() => {
    authenticateWorkflow();
  }, []);

  useEffect(() => {
    CapApp.addListener("appUrlOpen", (data) => {
      // Example url: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = data.url.split(".app").pop();
      console.log("appUrlOpen", data);
      if (slug && slug !== "/") {
        const locationSearch = data.url.split(".app/search")[1];
        if (locationSearch) {
          authenticateWorkflow(locationSearch);
          router.replace("/search");
        }
      }
      // If no match, do nothing - let regular routing
      // logic take over
    });
  }, []);

  return <AuthCtx.Provider value={auth}>{children}</AuthCtx.Provider>;
};

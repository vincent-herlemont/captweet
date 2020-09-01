import React, { useState, useContext } from "react";
import AuthCtx from "./Auth";
import { Url } from "./Api";
import { Plugins } from "@capacitor/core";
import { values } from "faunadb";
const { Storage } = Plugins;

const DataCtx = React.createContext({});
export default DataCtx;

const TTL_STORAGE_KEY_SUFFIX = "ttl";
const USERS_STORAGE_KEY = "users";
const PROFILE_STORAGE_KEY = "profile";
const TWEETS_STORAGE_KEY = "tweets";

function ttlStorageKeyName(storageKey) {
  return storageKey + "_" + TTL_STORAGE_KEY_SUFFIX;
}

export const DataCtxProvider = ({ children }) => {
  const authCtx = useContext(AuthCtx);

  const requestData = async (url) => {
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

  const saveToStorage = async (key, json) => {
    json = JSON.stringify(json);
    if (!json) {
      console.error("Fail to save ", key);
      return;
    }
    await Storage.set({
      key: ttlStorageKeyName(key),
      value: Math.round(Date.now() / 1000),
    });

    await Storage.set({ key, value: json });
  };

  const getFromStorage = async (key, ttl = 600) => {
    let create_date = await Storage.get({ key: ttlStorageKeyName(key) });
    create_date = parseInt(create_date.value);
    let diff = Math.round(Date.now() / 1000) - create_date;
    if (diff > ttl) {
      return false;
    }

    try {
      let data = await Storage.get({ key });
      return JSON.parse(data.value);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const [profileData, setProfileData] = useState({});
  const [usersData, setUsersData] = useState({});
  const [tweetsData, setTweetsData] = useState({});

  const data = {
    profile: {
      data: profileData,
    },
    users: {
      data: usersData,
      get: async () => {
        let data = await getFromStorage(USERS_STORAGE_KEY);
        if (data && data.status === "OK") {
          setUsersData(data);
          return;
        }
        data = await requestData("api/twitter-following");
        console.log(data);
        setUsersData(data);
        saveToStorage(USERS_STORAGE_KEY, data);
      },
    },
    tweets: {
      data: tweetsData,
    },
  };

  return <DataCtx.Provider value={data}>{children}</DataCtx.Provider>;
};

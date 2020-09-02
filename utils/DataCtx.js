import React, { useState, useContext } from "react";
import { useRequest } from "./Api";
import { useStorage } from "./Storage";

const DataCtx = React.createContext({});
export default DataCtx;

const USERS_STORAGE_KEY = "users";
const PROFILE_STORAGE_KEY = "profile";
const TWEETS_STORAGE_KEY = "tweets";

export const DataCtxProvider = ({ children }) => {
  const requestData = useRequest();
  const { saveToStorage, getFromStorage } = useStorage();

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

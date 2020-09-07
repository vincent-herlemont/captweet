import React, { useState, useContext } from "react";
import { useRequest } from "./Api";
import { useStorage } from "./Storage";
import _ from "lodash";

const DataCtx = React.createContext({});
export default DataCtx;

const USERS_STORAGE_KEY = "users";
const PROFILE_STORAGE_KEY = "profile";
const TWEETS_STORAGE_KEY = "tweets";
const TARGET_USER_STORAGE_KEY = "target_user";

export const DataCtxProvider = ({ children }) => {
  const requestData = useRequest();
  const { saveToStorage, getFromStorage } = useStorage();

  const [profileData, setProfileData] = useState({});
  const [usersData, setUsersData] = useState({});
  const [pools, setPools] = useState([]);
  const [targetUser, setTargetUser] = useState({});

  const loadTargetUser = async function () {
    let user = await getFromStorage(TARGET_USER_STORAGE_KEY, 1000);
    setTargetUser(user);
    return user;
  };

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
    game: {
      users_tweets: [],
      getTweets: async function () {},
      targetUser,
      setTargetUser: async function (user) {
        user = _.cloneDeep(user);
        saveToStorage(TARGET_USER_STORAGE_KEY, user);
        setTargetUser(user);
      },
      loadTargetUser,
      isStart: async () => {
        let user = await loadTargetUser();
        return user && user.id;
      },
      pools,
      createPool: function () {},
    },
  };

  return <DataCtx.Provider value={data}>{children}</DataCtx.Provider>;
};

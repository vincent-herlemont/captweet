import React, { useContext, useEffect, useReducer, useState } from "react";
import { useRequest } from "./Api";
import { useStorage } from "./Storage";
import _ from "lodash";
import AuthCtx from "./Auth";
import { useRouter } from "next/router";

const DataCtx = React.createContext({ plop: "toto" });
export default DataCtx;

const USERS_STORAGE_KEY = "users";
const PROFILE_STORAGE_KEY = "profile";
const TWEETS_STORAGE_KEY = "tweets";
const TARGET_USER_STORAGE_KEY = "target_user";

export const DataCtxProvider = ({ children }) => {
  const authCtx = useContext(AuthCtx);
  const requestData = useRequest();
  const { saveToStorage, getFromStorage } = useStorage();
  const router = useRouter();

  const [profileData, setProfileData] = useState({});
  const [usersData, setUsersData] = useState({});

  async function getTweets(userId) {
    // let data = await requestData(`api/twitter-user-timeline?id=${userId}`);
    // console.log("LOOOL", data);
  }

  async function loadTargetUser() {
    let user = await getFromStorage(TARGET_USER_STORAGE_KEY, 1000);
    dispatchGameData({ type: "load_target_user", targetUser: user });
  }

  async function setTargetUser(user) {
    user = _.cloneDeep(user);
    saveToStorage(TARGET_USER_STORAGE_KEY, user);
    dispatchGameData({ type: "load_target_user", targetUser: user });
  }

  async function getFollowing() {
    let data = await getFromStorage(USERS_STORAGE_KEY);
    if (data && data.status === "OK") {
      setUsersData(data);
      return;
    }
    data = await requestData("api/twitter-following");
    setUsersData(data);
    saveToStorage(USERS_STORAGE_KEY, data);
  }

  function gameAction(state, action) {
    switch (action.type) {
      case "load_target_user": {
        return {
          ...state,
          isStart: true,
          loading: false,
          targetUser: action.targetUser,
        };
      }
    }
  }

  const [gameData, dispatchGameData] = useReducer(gameAction, {
    isStart: false,
    loading: true,
    targetUser: {},
  });

  const ctx = {
    profile: {
      data: profileData,
    },
    users: {
      data: usersData,
    },
    game: {
      data: gameData,
      dispatch: dispatchGameData,
      setTargetUser,
      users_tweets: [],
    },
  };

  useEffect(() => {
    const { status, loading } = authCtx.token;
    if (status && !loading) {
      getFollowing();
    }
  }, [authCtx.token]);

  useEffect(() => {
    loadTargetUser();
  }, []);

  useEffect(() => {
    const workflow = async () => {
      const { status, loading: tokenLoading } = authCtx.token;
      const { isStart, loading: gameLoading } = ctx.game.data;
      if (!status && !tokenLoading) {
        await router.push("/");
        return;
      }

      if (isStart && !gameLoading) {
        await router.push("/game");
        return;
      }

      if (!isStart && !gameLoading) {
        await router.push("/search");
        return;
      }

      await getTweets(ctx.game.data.targetUser.id);
    };

    workflow();
  }, [authCtx.token, ctx.game.data]);

  return <DataCtx.Provider value={ctx}>{children}</DataCtx.Provider>;
};

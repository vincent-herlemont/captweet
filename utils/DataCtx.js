import React, { useContext, useEffect, useReducer, useState } from "react";
import { useRequest } from "./Api";
import { useStorage } from "./Storage";
import AuthCtx from "./Auth";
import { useRouter } from "next/router";
import _ from "lodash";

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

  async function getTweetsByUser(userId, screenName) {
    const storage_key = `${TWEETS_STORAGE_KEY}_${userId}`;

    // let localResp = await getFromStorage(storage_key);
    // if (localResp && localResp.length > 0) {
    //   ctx.game.users_tweets[storage_key] = localResp;
    //   return;
    // }

    let remoteResp = await requestData(
      `api/twitter-user-timeline?id=${userId}&name=${screenName}`
    );
    if (remoteResp && remoteResp.data && remoteResp.data.length > 0) {
      ctx.game.users_tweets[userId] = remoteResp.data;
      // saveToStorage(storage_key, remoteResp.data);
      return true;
    } else {
      return false;
    }
  }

  async function getTweetsByUsers(userRefs) {
    let promises = userRefs.map(({ id, name }) => getTweetsByUser(id, name));
    await Promise.all(promises);
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
    let localResp = await getFromStorage(USERS_STORAGE_KEY);
    if (localResp) {
      setUsersData(localResp);
      return;
    }
    let remoteResp = await requestData("api/twitter-following");
    if (remoteResp && remoteResp.data && remoteResp.data.users) {
      let data = remoteResp.data.users;
      setUsersData(data);
      saveToStorage(USERS_STORAGE_KEY, data);
    }
  }

  function gameAction(state, action) {
    switch (action.type) {
      case "load_target_user": {
        return action.targetUser && action.targetUser.id
          ? {
              ...state,
              targetUser: {
                isStart: true,
                loading: false,
                value: action.targetUser,
              },
            }
          : {
              ...state,
              targetUser: {
                isStart: false,
                loading: false,
                value: {},
              },
            };
      }
      case "start_quiz": {
        return !state.quiz.loading
          ? {
              ...state,
              quiz: {
                ...state.quiz,
                loading: true,
              },
            }
          : state;
      }
      case "add_quiz": {
        return {
          ...state,
          quiz: {
            ...state.quiz,
            value: [
              ...state.quiz.value,
              {
                tweets: action.tweets,
              },
            ],
          },
        };
      }
      case "move_quiz": {
        let next_current = state.quiz.current + action.n;
        if (next_current < 0 || next_current > state.quiz.value.length - 1) {
          return state;
        }
        return {
          ...state,
          quiz: {
            ...state.quiz,
            current: next_current,
          },
        };
      }
    }
  }

  function drawUsers(users, n = 12) {
    let userRefList = users.map(({ id, screen_name }) => {
      return { id, name: screen_name };
    });
    let out = [];
    for (let i = 0; i < n; i++) {
      let n = _.random(0, userRefList.length - 1);
      let userRef = _.pullAt(userRefList, [n])[0];
      if (userRef) {
        out.push(userRef);
      } else {
        n++;
      }
    }
    return out;
  }

  function pullTweet(userId) {
    let tweets = ctx.game.users_tweets[userId];
    let rand = _.random(0, tweets.length - 1);
    return tweets[rand];
  }

  async function createQuiz() {
    let list_userIds = _.keys(ctx.game.users_tweets);
    const tweets = [];

    _.pull(list_userIds, ctx.game.data.targetUser.value.id + "");
    let tweet = pullTweet(ctx.game.data.targetUser.value.id);
    tweets.push(tweet);

    for (let i = 0; i < 3; i++) {
      let r = _.random(0, list_userIds.length - 1);
      let userId = _.pullAt(list_userIds, [r])[0];
      if (!userId) {
        i++;
        continue;
      }
      let tweet = pullTweet(userId);
      tweets.push(tweet);
    }

    dispatchGameData({ type: "add_quiz", tweets });
  }

  const [gameData, dispatchGameData] = useReducer(gameAction, {
    targetUser: {
      isStart: false,
      loading: true,
      value: {},
    },
    quiz: {
      isStart: false,
      loading: false,
      current: 0,
      value: [],
    },
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
      users_tweets: {},
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
      const { isStart, loading: gameLoading } = ctx.game.data.targetUser;
      if (!status && !tokenLoading) {
        await router.push("/");
        return;
      }

      if (!isStart && !gameLoading) {
        await router.push("/search");
        return;
      }

      if (!ctx.users.data || !ctx.users.data.length) {
        return;
      }

      dispatchGameData({ type: "start_quiz" });
      // await getTweets(ctx.game.data.targetUser.id);
      // console.log("getTweets", ctx.game);
    };

    workflow();
  }, [authCtx.token, ctx.game.data.targetUser, ctx.users.data]);

  useEffect(() => {
    const workflow = async () => {
      let { isStart, loading } = ctx.game.data.quiz;
      if (loading) {
        let randomUsers = drawUsers(ctx.users.data);
        randomUsers.push({
          id: ctx.game.data.targetUser.value.id,
          name: ctx.game.data.targetUser.value.screen_name,
        });
        console.log("randomUsers", randomUsers);
        await getTweetsByUsers(randomUsers);
        console.log(ctx.game.users_tweets);
        await createQuiz();
        await createQuiz();

        return;
      }
    };

    workflow();
  }, [ctx.game.data.quiz.loading]);

  return <DataCtx.Provider value={ctx}>{children}</DataCtx.Provider>;
};

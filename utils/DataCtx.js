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

const INITIAL_STATES = {
  targetUser: {
    isStart: false,
    value: {},
  },
  quiz: {
    isStart: false,
    loading: false,
    current: 0,
    isEnded: false,
    score: 0,
    value: [],
  },
};

export const DataCtxProvider = ({ children }) => {
  const authCtx = useContext(AuthCtx);
  const requestData = useRequest();
  const { saveToStorage, getFromStorage, removeFromStorage } = useStorage();
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
    if (remoteResp?.length) {
      ctx.game.users_tweets[userId] = remoteResp;
      // saveToStorage(storage_key, remoteResp.data);
      return true;
    } else {
      ctx.game.users_tweets[userId] = [];
      return false;
    }
  }

  async function getTweetsByUsers(userRefs) {
    let promises = userRefs.map(({ id, name }) => getTweetsByUser(id, name));
    await Promise.all(promises);
  }

  async function setTargetUser(user) {
    user = _.cloneDeep(user);
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
      case "raz": {
        return {
          ...INITIAL_STATES,
          targetUser: {
            ...INITIAL_STATES.targetUser,
            loading: false,
          },
        };
      }
      case "loading_quiz": {
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
      case "start_quiz": {
        return state.quiz.loading
          ? {
              ...state,
              quiz: {
                ...state.quiz,
                loading: false,
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
                selected_tweet: {},
                tweets: action.tweets,
              },
            ],
          },
        };
      }
      case "move_quiz": {
        let next_current = state.quiz.current + action.n;
        if (next_current < 0 || next_current > state.quiz.value.length - 1) {
          return {
            ...state,
            quiz: {
              ...state.quiz,
              isEnded: state.quiz.current === state.quiz.value.length - 1,
            },
          };
        }
        return {
          ...state,
          quiz: {
            ...state.quiz,
            current: next_current,
          },
        };
      }
      case "select_tweet": {
        let isValid = state.targetUser.value.id === action.tweet.user.id;
        let quizValue = state.quiz.value.map((v, k) => {
          if (state.quiz.current === k) {
            return {
              ...v,
              selected_tweet: {
                id: action.tweet.id,
                valid: isValid,
              },
            };
          } else {
            return v;
          }
        });
        return {
          ...state,
          quiz: {
            ...state.quiz,
            score: isValid ? state.quiz.score + 1 : state.quiz.score,
            value: quizValue,
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
    return _.pullAt(tweets, [rand])[0];
  }

  async function createQuiz() {
    let list_userIds = _.keys(ctx.game.users_tweets);
    const tweets = [];

    _.pull(list_userIds, ctx.game.data.targetUser.value.id + "");
    let tweet = pullTweet(ctx.game.data.targetUser.value.id);
    if (!tweet) {
      return;
    }
    tweets.push(tweet);

    // TODO refactor loop
    for (let i = 0; i < 3; i++) {
      let r = _.random(0, list_userIds.length - 1);
      let userId = _.pullAt(list_userIds, [r])[0];
      if (!userId) {
        if (i > list_userIds.length - 1) {
          break;
        }
        i++;
        continue;
      }
      let tweet = pullTweet(userId);
      if (!tweet) {
        if (i > list_userIds.length - 1) {
          break;
        }
        i++;
        continue;
      }
      tweets.push(tweet);
    }

    dispatchGameData({ type: "add_quiz", tweets });
  }

  const [gameData, dispatchGameData] = useReducer(gameAction, INITIAL_STATES);

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
    const workflow = async () => {
      console.log("ctx.game.data", ctx.game.data);
      const { status, loading: tokenLoading } = authCtx.token;
      const { isStart } = ctx.game.data.targetUser;
      if (!status && !tokenLoading) {
        await router.push("/");
        return;
      }

      if (!isStart) {
        await router.push("/search");
        return;
      }

      if (isStart && router.pathname === "/search") {
        await router.push("/game");
      }

      if (!ctx.users.data || !ctx.users.data.length) {
        return;
      }

      console.log("users", ctx.users);
      dispatchGameData({ type: "loading_quiz" });
    };

    workflow();
  }, [authCtx.token, ctx.game.data.targetUser, ctx.users.data]);

  useEffect(() => {
    if (ctx.game.data.quiz.isEnded) {
      router.push("/end");
    }
  }, [ctx.game.data.quiz.isEnded]);

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
        await createQuiz();
        await createQuiz();

        dispatchGameData({ type: "start_quiz" });
        return;
      }
    };

    workflow();
  }, [ctx.game.data.quiz.loading]);

  return <DataCtx.Provider value={ctx}>{children}</DataCtx.Provider>;
};

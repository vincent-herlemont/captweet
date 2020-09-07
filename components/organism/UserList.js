import React, { useContext, useEffect } from "react";
import DataCtx from "../../utils/DataCtx";
import AuthCtx from "../../utils/Auth";
import UserItem from "../molecule/UserItem";
import styled from "styled-components";
import { useRouter } from "next/router";

const UserList = ({ className }) => {
  const dataCtx = useContext(DataCtx);
  const authCtx = useContext(AuthCtx);
  const router = useRouter();

  useEffect(() => {
    dataCtx.users.get();
  }, [authCtx]);

  if (dataCtx.users.data && dataCtx.users.data.status === "OK") {
    const userItems = dataCtx.users.data.data.users.map((user) => {
      return (
        <UserItem
          key={user.id.toString()}
          user={user}
          onClick={async () => {
            await dataCtx.game.setTargetUser(user);
            await router.push("/game");
          }}
        />
      );
    });

    return <div className={className}>{userItems}</div>;
  }

  return (
    <div>Loaging ... {dataCtx.users.data && dataCtx.users.data.status}</div>
  );
};

export default styled(UserList)`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

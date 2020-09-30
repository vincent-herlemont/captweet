import React, { useContext } from "react";
import DataCtx from "../../utils/DataCtx";
import UserItem from "../molecule/UserItem";
import styled from "styled-components";
import { useRouter } from "next/router";
import _ from "lodash";

const UserList = ({ className }) => {
  const dataCtx = useContext(DataCtx);
  const router = useRouter();

  if (dataCtx.users.data && dataCtx.users.data.length) {
    let users = _.shuffle(dataCtx.users.data);
    const userItems = users.map((user) => {
      return (
        <UserItem
          key={user.id.toString()}
          user={user}
          onClick={async () => {
            await dataCtx.game.setTargetUser(user);
            await router.push("/game");
            window.scrollTo(0, 0);
          }}
        />
      );
    });

    return <div className={className}>{userItems}</div>;
  }

  return (
    <div>Loading ... {dataCtx.users.data && dataCtx.users.data.status}</div>
  );
};

export default styled(UserList)`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

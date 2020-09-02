import React, { useContext, useEffect } from "react";
import DataCtx from "../../utils/DataCtx";
import AuthCtx from "../../utils/Auth";
import UserItem from "../molecule/UserItem";
import styled from "styled-components";

const UserList = ({ className }) => {
  const dataCtx = useContext(DataCtx);
  const authCtx = useContext(AuthCtx);

  useEffect(() => {
    dataCtx.users.get();
  }, [authCtx]);

  if (dataCtx.users.data && dataCtx.users.data.status === "OK") {
    console.log(dataCtx.users.data);

    const userItems = dataCtx.users.data.data.users.map((user) => {
      return <UserItem key={user.id.toString()} user={user} />;
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

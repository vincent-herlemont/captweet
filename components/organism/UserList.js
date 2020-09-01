import React, { useContext, useEffect } from "react";
import DataCtx from "../../utils/DataCtx";
import AuthCtx from "../../utils/Auth";

const UserList = () => {
  const dataCtx = useContext(DataCtx);
  const authCtx = useContext(AuthCtx);

  useEffect(() => {
    dataCtx.users.get();
  }, [authCtx]);

  return <div>User list {dataCtx.users.data && dataCtx.users.data.status}</div>;
};

export default UserList;

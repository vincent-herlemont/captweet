import React, { useState } from "react";

const DataCtx = React.createContext({});

export default DataCtx;

export const DataCtxProvider = ({ children }) => {
  const profile = useState({});
  const users = useState({});
  const tweets = useState({});

  const data = {
    profile,
    users,
    tweets,
  };

  return <DataCtx.Provider value={data}>{children}</DataCtx.Provider>;
};

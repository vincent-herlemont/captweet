import React, { useState } from "react";

const SearchCtx = React.createContext();

export default SearchCtx;

export const SearchCtxProvider = ({ children }) => {
  const [search, setSearch] = useState("My search");
  return (
    <SearchCtx.Provider value={[search, setSearch]}>
      {children}
    </SearchCtx.Provider>
  );
};

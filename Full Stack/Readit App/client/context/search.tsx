import React, { createContext, useContext, useState } from "react";
import { Sub } from "../utils/typeDefs";

const SearchContext = createContext({
  subs: [],
  setSubs: (arg) => {},
});

export const useSearch = () => useContext(SearchContext);

function SearchProvider(props: any) {
  const [subs, setSubs] = useState<Sub[]>([]);

  const value: any = {
    subs,
    setSubs,
  };

  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;

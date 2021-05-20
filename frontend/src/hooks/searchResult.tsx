import React, { createContext, useContext, useState } from 'react';
import { IGroup, IUseSearchResult } from "../interfaces";

const ContextSearchRes = createContext({} as IUseSearchResult);

const SearchResProvider: React.FC = ({ children }) => {

  const [resultSearch, setResultSearch] = useState<IGroup[]>();

  return (
    <ContextSearchRes.Provider
      value={{
        resultSearch, setResultSearch
      }}
    >
      {children}
    </ContextSearchRes.Provider>
  );
};

export function useSearchResult() {
  const { resultSearch, setResultSearch } = useContext(ContextSearchRes);

  return { resultSearch, setResultSearch };
}

export default SearchResProvider;
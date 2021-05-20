import React, { createContext, useContext, useState } from 'react';
import { IUserSearchDesc } from "../interfaces";

const ContextSearchDescription = createContext({} as IUserSearchDesc);

const SearchDescProvider: React.FC = ({ children }) => {

  const [currentResearch, setCurrentResearch] = useState("");

  return (
    <ContextSearchDescription.Provider
      value={{
        currentResearch, setCurrentResearch
      }}
    >
      {children}
    </ContextSearchDescription.Provider>
  );
};

export function useSearchDescription() {
  const { currentResearch, setCurrentResearch } = useContext(ContextSearchDescription);

  return { currentResearch, setCurrentResearch };
};

export default SearchDescProvider;

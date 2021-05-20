import React, { createContext, useContext, useState } from 'react';
import { IUseCount } from "../interfaces";

const CountContext = createContext({} as IUseCount);

const CountProvider: React.FC = ({ children }) => {

  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider
      value={{
        count, setCount
      }}
    >
      {children}
    </CountContext.Provider>
  );
};

export function useCount() {
  const { count, setCount } = useContext(CountContext);

  return { count, setCount }
};

export default CountProvider;

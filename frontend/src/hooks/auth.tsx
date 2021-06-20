import React, { createContext, useContext, useState } from 'react';
import { IUseAuth } from "../interfaces";

const AuthContext = createContext({} as IUseAuth);

const AuthProvider: React.FC = ({ children }) => {

  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuth, setIsAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  return { isAuth, setIsAuth }
};

export default AuthProvider;

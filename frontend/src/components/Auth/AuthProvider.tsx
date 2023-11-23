import { useState } from 'react';

import AuthContext from './AuthContext';

type AuthState = {
  isLogin: boolean;
  setLogout: () => void;
  setLogin: () => void;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  AuthContext.Provider;
  const setLogout = () => {
    setState((prevState: AuthState) => ({
      ...prevState,
      isLogin: false,
    }));
  };

  const setLogin = () => {
    setState((prevState: AuthState) => ({
      ...prevState,
      isLogin: true,
    }));
  };

  const initialState = {
    isLogin: false,
    setLogout,
    setLogin,
  };

  const [state, setState] = useState(initialState);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

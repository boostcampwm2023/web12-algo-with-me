import { createContext } from 'react';

const AuthContext = createContext({
  isLogin: false,
  setLogout: () => {},
  setLogin: () => {},
});

export default AuthContext;

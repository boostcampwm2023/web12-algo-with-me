import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedin: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

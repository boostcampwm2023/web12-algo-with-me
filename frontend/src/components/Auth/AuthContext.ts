import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedin: false,
  email: '',
  login: (email: string) => {},
  logout: () => {},
});

export default AuthContext;

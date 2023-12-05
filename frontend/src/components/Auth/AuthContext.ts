import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedin: false,
  email: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (email: string) => {},
  logout: () => {},
});

export default AuthContext;

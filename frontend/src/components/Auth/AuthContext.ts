import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedin: false,
  email: '',
  login: (email: string) => {
    email;
  },
  logout: () => {},
});

export default AuthContext;

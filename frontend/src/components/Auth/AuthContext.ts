import { createContext } from 'react';

interface AuthContextProps {
  isLoggedin: boolean;
  email: string;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedin: false,
  email: '',
  login: () => {},
  logout: () => {},
});

export default AuthContext;

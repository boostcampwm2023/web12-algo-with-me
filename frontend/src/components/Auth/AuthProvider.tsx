import { useState } from 'react';

import AuthContext from './AuthContext';

type AuthState = {
  isLogin: boolean;
  setLogout: () => void;
  setLogin: () => void;
};

// const TOKEN_KEY = 'accessToken';
// const AUTH_TEST_API = 'http://101.101.208.240:3000/auths/tests';
// const UNAUTHORIZED_STATUS = 401;

// function saveToken(token: string) {
//   localStorage.setItem(TOKEN_KEY, token);
// }

// function getToken() {
//   return localStorage.getItem(TOKEN_KEY);
// }

// function removeToken() {
//   localStorage.removeItem(TOKEN_KEY);
// }

// async function fetchAuth() {
//   const token = getToken();
//   if (!token) return;
//   try {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     const response = await axios.get('AUTH_TEST_API').json();
//     if (response.statusCode == UNAUTHORIZED_STATUS) return;
//   } catch (e) {
//     console.log(e);
//   }
// }

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

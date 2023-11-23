import { useState } from 'react';

import AuthContext from './AuthContext';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  function logout() {
    setIsLogined(false);
  }
  function login() {
    setIsLogined(true);
  }

  const [isLoggedin, setIsLogined] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isLoggedin, logout, login }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

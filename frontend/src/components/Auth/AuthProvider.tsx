import { useState } from 'react';

import AuthContext from './AuthContext';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  function logout() {
    setIsLogined(false);
    setEmail('');
  }
  function login(email: string) {
    setIsLogined(true);
    setEmail(email);
  }

  const [isLoggedin, setIsLogined] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  return (
    <AuthContext.Provider value={{ isLoggedin, logout, login, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

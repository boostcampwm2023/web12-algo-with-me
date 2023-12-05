import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchTokenValid, type TokenValidResponse } from '@/apis/auth';
import AuthContext from '@/components/Auth/AuthContext';

const TOKEN_KEY = 'accessToken';

export default function useAuth() {
  const { isLoggedin, login, logout } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) return;
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);

    if (!token) return;
    evaluateToken(token);
  }, []);

  const evaluateToken = async (token: string) => {
    try {
      const info = await fetchTokenValid(token);
      saveAuthInfo(info, token);
    } catch (e) {
      removeAuthInfo();
    }
  };

  const saveAuthInfo = (info: TokenValidResponse, token: string) => {
    const { email } = info;

    localStorage.setItem(TOKEN_KEY, token);
    login(email);
  };

  const removeAuthInfo = () => {
    localStorage.removeItem(TOKEN_KEY);
    logout();
  };

  const changeLoginInfo = () => {
    removeAuthInfo();
    navigate('/login');
  };

  const changeLogoutInfo = () => {
    removeAuthInfo();
  };
  return { changeLoginInfo, changeLogoutInfo, isLoggedin };
}

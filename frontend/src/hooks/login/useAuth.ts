import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthContext from '@/components/Auth/AuthContext';

import axios, { type AxiosError } from 'axios';

const TOKEN_KEY = 'accessToken';
const BASE_URL = import.meta.env.VITE_API_URL;
const AUTH_TEST_PATH = '/auths/tests';

const URL = `${BASE_URL}${AUTH_TEST_PATH}`;

interface TokenValidResponse {
  id: number;
  email: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

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

  const fetchTokenValid = async (token: string): Promise<TokenValidResponse> => {
    try {
      const response = await axios.get(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await response.data;
    } catch (e) {
      const error = e as AxiosError;
      console.error('토큰 유효성 확인 실패:', error.message);
      throw error;
    }
  };

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

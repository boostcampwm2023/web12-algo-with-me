import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthContext from '@/components/Auth/AuthContext';

import axios from 'axios';

const TOKEN_KEY = 'accessToken';
const BASE_URL = import.meta.env.VITE_API_URL;
const AUTH_TEST_PATH = '/auths/tests';

const URL = `${BASE_URL}${AUTH_TEST_PATH}`;

const fetchTokenValid = async (token: string) => {
  try {
    const response = await axios.get(URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // {email: 'mahwin7085@gmail.com', nickname: 'mahwin7085@gmail.com'}
    // 저장할 지 말지는 나중에 결정
    const data = await response.data;
    console.log(data, '인증 받음.');
    if (response.status === 200) return true;
    // 올바른 유저라는 검증을 받음.
  } catch (e) {
    console.log('인증 받지 못함.', e);
    return false;
  }
};

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
    const isValid = await fetchTokenValid(token);
    isValid ? saveAuthInfo(token) : removeAuthInfo();
  };

  const saveAuthInfo = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    login();
  };

  const removeAuthInfo = () => {
    // accessToken 없애기
    // AuthContext 없애기
    localStorage.removeItem(TOKEN_KEY);
    logout();
  };

  const changeLoginInfo = () => {
    // accessToken 없애기
    // AuthContext 없애기
    // 로그인 페이지로 이동
    removeAuthInfo();
    navigate('/login');
  };

  const changeLogoutInfo = () => {
    // accessToken 없애기
    // AuthContext 없애기
    removeAuthInfo();
  };
  return { changeLoginInfo, changeLogoutInfo, isLoggedin };
}

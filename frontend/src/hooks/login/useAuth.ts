import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthContext from '@/components/Auth/AuthContext';

import axios from 'axios';

const TOKEN_KEY = 'accessToken';
const API_URL = 'http://101.101.208.240:3000';
const AUTH_TEST_PATH = '/auths/tests';

const URL = `${API_URL}${AUTH_TEST_PATH}`;

const fetchTokenValid = async (token: string) => {
  console.log('accessToken 검증 시작 5시53분 배포');
  try {
    const response = await axios.get(URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // {email: 'mahwin7085@gmail.com', nickname: 'mahwin7085@gmail.com'
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
  const { isLogin, setLogin, setLogout } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 된 상태라면 아무것도 하지 않음
    if (isLogin) return;

    // 로그인 안 된 상태라면 검증을 해야할 경우가 두 가지 경우가 있음

    // 1. 쿼리에 accessToken이 있는 경우
    // 토큰을 검증 후에 localStorage에 저장하고
    // AuthContext.isLogin = true로 변경
    // 2. 쿼리에 accessToken이 없지만, localStorage에 accessToken이 있는 경우
    // 토큰을 꺼내서 검증 후에 AuthContext.isLogin = true로 변경

    const queryParams = new URLSearchParams(location.search);
    // 당연히 쿼리에 token 값이 있으면 token 값을 먼저 사용하도록 함.
    const token = queryParams.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);

    if (!token) return;
    const tokenValidPromise = fetchTokenValid(token);
    tokenValidPromise.then((isValid) => {
      if (isValid) {
        saveAuthInfo(token);
      } else {
        removeAuthInfo();
      }
    });
  }, []);

  const saveAuthInfo = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setLogin();
  };

  const removeAuthInfo = () => {
    // accessToken 없애기
    // AuthContext 없애기
    localStorage.removeItem(TOKEN_KEY);
    setLogout();
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
  return { changeLoginInfo, changeLogoutInfo, isLogin };
}

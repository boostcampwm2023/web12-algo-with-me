import api, { type Error } from '@/utils/api';

import { type TokenValidResponse } from './types';

const AUTH_TEST_PATH = '/auths/tests';

export const fetchTokenValid = async (token: string): Promise<TokenValidResponse> => {
  try {
    const response = await api.get(AUTH_TEST_PATH, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.data;
  } catch (e) {
    const error = e as Error;
    console.error('토큰 유효성 확인 실패:', error.message);
    throw error;
  }
};

export { type TokenValidResponse };

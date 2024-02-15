import * as reactRouterDom from 'react-router-dom';

import AuthProvider from '@/components/Auth/AuthProvider';
import Header from '@/components/Header';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
const CORRECT_TOKEN = 'correct';
const INCORRECT_TOKEN = 'inCorrect';

const useLocationReturn = (token: string) => ({
  state: '',
  key: '',
  pathname: '',
  hash: '',
  search: `?accessToken=${token}`,
});

type RRD = Record<string, unknown>;

vi.mock('react-router-dom', async () => {
  const originRRD = (await vi.importActual('react-router-dom')) as RRD;
  return { ...originRRD, useLocation: vi.fn(), useNavigate: vi.fn(), Link: vi.fn() };
});

describe('Header 컴포넌트 검증 with 올바른 토큰', () => {
  test('로그아웃 버튼이 보여야 한다.', async () => {
    vi.spyOn(reactRouterDom, 'useLocation').mockReturnValue(useLocationReturn(CORRECT_TOKEN));

    const { findByText } = render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    expect(await findByText(/로그아웃/i)).toBeInTheDocument();
  });
});

describe('Header 컴포넌트 검증 with 잘못된 토큰', () => {
  test('로그인 버튼이 보여야 한다.', async () => {
    vi.spyOn(reactRouterDom, 'useLocation').mockReturnValue(useLocationReturn(INCORRECT_TOKEN));

    const { findByText } = render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    expect(await findByText(/로그인/i)).toBeInTheDocument();
  });
});

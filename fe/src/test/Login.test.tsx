import * as reactRouterDom from 'react-router-dom';

import AuthProvider from '@/components/Auth/AuthProvider';
import Header from '@/components/Header';

import '@/utils/test/localStorage';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';

const CORRECT_TOKEN = 'correct';
const INCORRECT_TOKEN = 'inCorrect';

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

const useLocationReturn = (token: string) => ({
  state: '',
  key: '',
  pathname: '',
  hash: '',
  search: `?accessToken=${token}`,
});

type RRD = Record<string, unknown>;

const usedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const originRRD = (await vi.importActual('react-router-dom')) as RRD;
  return { ...originRRD, useLocation: vi.fn(), useNavigate: () => usedNavigate, Link: vi.fn() };
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

describe('Header 컴포넌트 검증 with 올바른 LocalStorage 값', () => {
  test('로그아웃 버튼이 보여야 한다.', async () => {
    localStorage.setItem('accessToken', CORRECT_TOKEN);
    // @ts-expect-error ts-ignore
    vi.spyOn(reactRouterDom, 'useLocation').mockReturnValue('');

    const { findByText } = render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );
    expect(await findByText(/로그아웃/i)).toBeInTheDocument();
  });
});

describe('Header 컴포넌트 검증 with 잘못된 LocalStorage 값', () => {
  test('로그인 버튼이 보여야 한다.', async () => {
    localStorage.setItem('accessToken', INCORRECT_TOKEN);
    // @ts-expect-error ts-ignore
    vi.spyOn(reactRouterDom, 'useLocation').mockReturnValue('');

    const { findByText } = render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );
    expect(await findByText(/로그인/i)).toBeInTheDocument();
  });
});

describe('Header 컴포넌트 검증 로그인 버튼 클릭', () => {
  test('useNavigate가 /login 으로 routing 한다.', async () => {
    // @ts-expect-error ts-ignore
    vi.spyOn(reactRouterDom, 'useLocation').mockReturnValue('');

    const { findByText } = render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );
    const loginButton = await findByText(/로그인/i);
    fireEvent.click(loginButton);
    expect(usedNavigate).toHaveBeenCalledWith('/login');
  });
});

describe('Header 컴포넌트 검증 로그아웃 버튼 클릭', () => {
  it('저장된 유저 정보가 없어지고, 로그인 버튼이 렌더링된다.', async () => {
    vi.spyOn(reactRouterDom, 'useLocation').mockReturnValue(useLocationReturn(CORRECT_TOKEN));

    const { findByText } = render(
      <AuthProvider>
        <Header />
      </AuthProvider>,
    );

    const logOutButton = await findByText(/로그아웃/i);
    test('로그아웃 버튼을 누르기 전에는 accessToken이 존재한다.', () => {
      expect(localStorage.getItem('accessToken')).toBe('correct');
    });
    test('로그아웃 버튼을 누르 후 accessToken은 null이다.', () => {
      fireEvent.click(logOutButton);
      expect(localStorage.getItem('accessToken')).toBe(null);
    });
  });
});

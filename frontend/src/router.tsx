import { createBrowserRouter } from 'react-router-dom';

import ContestPage from '@/pages/ContestPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';

import App from './App';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        { path: 'contest', element: <ContestPage /> },
        { path: 'login', element: <LoginPage /> },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === 'production' ? '/web12-algo-with-me' : '',
  },
);

export default router;

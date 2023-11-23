import { createBrowserRouter } from 'react-router-dom';

import ContestPage from '@/pages/ContestPage';
import LoginPage from '@/pages/LoginPage';
import ProblemPage from '@/pages/ProblemPage';

import App from './App';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          path: '/contest/:id',
          element: <ContestPage />,
        },
        {
          path: '/problem/:id',
          element: <ProblemPage />,
        },
        { path: '/login', element: <LoginPage /> },
      ],
    },
  ],
  { basename: process.env.NODE_ENV === 'production' ? '/web12-algo-with-me' : '' },
);

export default router;

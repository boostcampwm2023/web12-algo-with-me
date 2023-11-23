import { createBrowserRouter } from 'react-router-dom';

import ContestPage from '@/pages/ContestPage';
import CreateCompetitionPage from '@/pages/CreateCompetitionPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
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
          element: <MainPage />,
        },
        {
          path: '/contest/:id',
          element: <ContestPage />,
        },
        {
          path: '/problem/:id',
          element: <ProblemPage />,
        },
        {
          path: '/contest/create',
          element: <CreateCompetitionPage />,
        },
        { path: '/login', element: <LoginPage /> },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === 'production' ? '/web12-Algo-With-Me' : '',
  },
);

export default router;

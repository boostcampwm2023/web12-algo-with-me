import { createBrowserRouter } from 'react-router-dom';

import Login from '@/components/Login';
import ContestPage from '@/pages/ContestPage';
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
        { path: '/login', element: <Login /> },
      ],
    },
  ],
  { basename: process.env.NODE_ENV === 'production' ? '/web12-algo-with-me' : '' },
);

export default router;

import { createBrowserRouter } from 'react-router-dom';

import ContestPage from '@/pages/ContestPage';
import CreateCompetitionPage from '@/pages/CreateCompetitionPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import ProblemPage from '@/pages/ProblemPage';

import App from './App';
import CompetitionDetailPage from './pages/CompetitionDetailPage';

const router = createBrowserRouter([
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
      {
        path: '/contest/detail/:id',
        element: <CompetitionDetailPage />,
      },
    ],
  },
]);

export default router;

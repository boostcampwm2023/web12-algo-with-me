import { createBrowserRouter } from 'react-router-dom';

import CompetitionPage from '@/pages/CompetitionPage';
import CreateCompetitionPage from '@/pages/CreateCompetitionPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import ProblemPage from '@/pages/ProblemPage';

import App from './App';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import DashboardPage from './pages/DashboardPage';
import TestCompetitionPage from './pages/TestCompetitionPage';

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
        path: '/competition/:id',
        element: <CompetitionPage />,
      },
      {
        path: '/problem/:id',
        element: <ProblemPage />,
      },
      {
        path: '/competition/create',
        element: <CreateCompetitionPage />,
      },
      { path: '/login', element: <LoginPage /> },
      {
        path: '/competition/detail/:id',
        element: <CompetitionDetailPage />,
      },
      {
        path: '/competition/dashboard/:id',
        element: <DashboardPage />,
      },
      {
        path: '/competition/test',
        element: <TestCompetitionPage />,
      },
    ],
  },
]);

export default router;

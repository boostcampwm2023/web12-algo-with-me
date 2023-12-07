import { createBrowserRouter } from 'react-router-dom';

import CompetitionPage from '@/pages/CompetitionPage';
import CreateCompetitionPage from '@/pages/CreateCompetitionPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import ProblemPage from '@/pages/ProblemPage';

import App from './App';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import DashboardPage from './pages/DashboardPage';

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
        element: <CompetitionPage />,
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
      {
        path: '/contest/dashboard/:id',
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;

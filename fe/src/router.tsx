import { createBrowserRouter } from 'react-router-dom';

import {
  CompetitionDetailPage,
  CompetitionPage,
  CreateCompetitionPage,
  DashboardPage,
  LoginPage,
  MainPage,
  ProblemPage,
  SandboxPage,
} from '@/pages';

import App from './App';

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
      { path: '/sandbox', element: <SandboxPage /> },
    ],
  },
]);

export default router;

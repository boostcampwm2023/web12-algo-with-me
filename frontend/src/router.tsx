import { createBrowserRouter } from 'react-router-dom';

import ContestPage from '@/pages/ContestPage';
import CreateCompetitionPage from '@/pages/CreateCompetitionPage';
import ProblemPage from '@/pages/ProblemPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ContestPage />,
      },
      {
        path: '/problem/:id', // TODO: api 연동 후 수정
        element: <ProblemPage />,
      },
      {
        path: '/competition/create',
        element: <CreateCompetitionPage />,
      },
    ],
  },
]);

export default router;

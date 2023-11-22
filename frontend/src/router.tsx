import { createBrowserRouter } from 'react-router-dom';

import CompetitionCreatePage from '@/pages/CompetitionCreatePage';
import ContestPage from '@/pages/ContestPage';
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
        element: <CompetitionCreatePage />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';

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
        path: '/contest/:id',
        element: <ContestPage />,
      },
      {
        path: '/problem/:id',
        element: <ProblemPage />,
      },
    ],
  },
]);

export default router;

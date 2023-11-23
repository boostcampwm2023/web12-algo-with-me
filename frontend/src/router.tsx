import { createBrowserRouter } from 'react-router-dom';

import ContestPage from '@/pages/ContestPage';
import MainPage from '@/pages/MainPage';
import ProblemPage from '@/pages/ProblemPage';

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

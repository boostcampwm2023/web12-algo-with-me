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
        element: <ContestPage />,
      },
      {
        path: '/problem/:id', // TODO: api 연동 후 수정
        element: <ProblemPage />,
      },
      {
        path: '/main',
        element: <MainPage />,
      },
    ],
  },
]);

export default router;

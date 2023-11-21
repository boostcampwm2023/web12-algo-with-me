import { createBrowserRouter } from 'react-router-dom';

import ContestPage from '@/pages/ContestPage';
import LoginPage from '@/pages/LoginPage';

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
      { path: 'login', element: <LoginPage /> },
    ],
  },
]);

export default router;

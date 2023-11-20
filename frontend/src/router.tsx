import { createBrowserRouter } from 'react-router-dom';

import ContestPage from '@/components/ContestPage';

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
    ],
  },
]);

export default router;

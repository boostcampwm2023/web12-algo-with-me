import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthProvider from './components/Auth/AuthProvider';
import { ModalProvider } from './components/Modal/ModalProvider';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <RouterProvider router={router}></RouterProvider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>,
);

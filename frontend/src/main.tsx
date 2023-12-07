import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthProvider from './components/Auth/AuthProvider';
import { Modal } from './components/Common';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider>
    <Modal.Provider>
      <RouterProvider router={router}></RouterProvider>
    </Modal.Provider>
  </AuthProvider>,
  // {/* </React.StrictMode>, */}
);

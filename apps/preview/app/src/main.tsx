/* eslint-disable import/first */
import './globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { setup } from './app';
import { getRouter } from './routes';

setup();

const router = await getRouter();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

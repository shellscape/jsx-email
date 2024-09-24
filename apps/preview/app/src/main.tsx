import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { setup } from './app';
import { getRouter } from './routes';
import { gather } from './templates';

setup();

const router = getRouter(await gather());
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <h1>h</h1>
    <RouterProvider router={router} />
  </StrictMode>
);

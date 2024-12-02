import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { setup } from './app';
import { getRouter } from './routes';
import { gather } from './templates';

setup();

// if (import.meta.hot) {
//   import.meta.hot.accept((mod) => {
//     console.log(mod);
//   });
// }

const router = getRouter(await gather());
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

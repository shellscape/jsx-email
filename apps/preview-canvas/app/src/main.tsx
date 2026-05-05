import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';
import './index.css';
import 'tippy.js/dist/tippy.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

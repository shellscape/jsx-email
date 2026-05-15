import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';
import { usePreviewStore } from './stores/preview-store';
import './index.css';
import 'tippy.js/dist/tippy.css';

usePreviewStore.getState().startSpamAnalysis();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import './index.css';
import '@/i18n/config';

import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);

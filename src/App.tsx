import '@/App.css';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '@/components/Header/Header';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <LocaleSwitcher />
        <div className="App">
          <header className="App-header">
            <p className="header">{t('welcome')}</p>

            <div className="body">
              <button onClick={() => setCount((count) => count + 1)}>
                🪂 Click me : {count}
              </button>

              <p> Don&apos;t forgot to install Eslint and Prettier in Your Vscode.</p>

              <p>
                Mess up the code in <code>App.tsx </code> and save the file.
              </p>
              <p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                {' | '}
                <a
                  className="App-link"
                  href="https://vitejs.dev/guide/features.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vite Docs
                </a>
              </p>
            </div>
          </header>
        </div>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;

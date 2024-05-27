import '@/App.css';
import '@mantine/core/styles.css';
import '@fontsource-variable/plus-jakarta-sans';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from '@/components/AppLayout/AppLayout';
import PagesLayout from '@/components/PagesLayout/PagesLayout';
import { AuthProvider } from '@/context/AuthContext';
import FAQPage from '@/pages/FAQ/FAQ';
import HomePage from '@/pages/Home/Home';
import Ideas from '@/pages/IdeasApp/Ideas';
import LoginPage from '@/pages/Login/LoginPage';
import NotFoundPage from '@/pages/NotFound/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      // cacheTime: Infinity,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <PagesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'FAQ',
        element: <FAQPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Ideas />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  const theme = {
    fontFamily: 'Plus Jakarta Sans Variable, sans-serif',
    colors: {
      'galaxy-blue': [
        '#e3e4ff',
        '#b2b3ff',
        '#7f85ff',
        '#4d5aff',
        '#1d1dfe',
        '#1605e5',
        '#1700b3',
        '#190081',
        '#150050',
        '#0b0020',
      ] as const,
    },
    primaryColor: 'orange',
  };

  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;

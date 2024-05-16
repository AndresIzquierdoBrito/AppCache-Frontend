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

const theme = {
  fontFamily: 'Plus Jakarta Sans Variable, sans-serif',
};

function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;

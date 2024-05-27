import { Flex, Loader } from '@mantine/core';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  isAuthorized: boolean;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/account/isAuthenticated`,
          { withCredentials: true }
        );
        if (response.data === true) {
          setAuthorized(true);
        }
      } catch (error) {
        console.error('Error checking authentication', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" direction="row" mih="100vh">
        <Loader size={50} />
      </Flex>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthorized, setAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

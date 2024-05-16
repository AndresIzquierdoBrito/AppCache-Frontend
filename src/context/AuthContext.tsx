import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isAuthorized: boolean;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setAuthorized] = useState(false);

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

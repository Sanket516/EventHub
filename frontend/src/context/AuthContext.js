import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

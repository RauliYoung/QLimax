'use client';
import React, { useState, ReactNode } from 'react';
import { UserContext, UserContextType } from '../contexts/usercontext';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const initialUser = localStorage.getItem('QLimaxToken') ? { token: localStorage.getItem('QLimaxToken') } : null;
  const [user, setUser] = useState<UserContextType['user']>(initialUser);

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


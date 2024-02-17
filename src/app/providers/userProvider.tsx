"use client";
import React, { useState, ReactNode, useEffect } from 'react';
import { UserContext, UserContextType } from '../contexts/usercontext';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextType['user']>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('QLimaxToken');
    const initialUser = storedToken ? { token: storedToken } : null;
    setUser(initialUser);
  }, []);

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;


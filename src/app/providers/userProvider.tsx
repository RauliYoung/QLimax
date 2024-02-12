import React, { useState, ReactNode } from 'react';
import { UserContext, UserContextType } from '../contexts/usercontext';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextType['user']>(null);

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


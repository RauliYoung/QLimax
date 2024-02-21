import React, { useState, useEffect, ReactNode, FC } from 'react';
import { UserContext, UserContextType } from '../contexts/usercontext';

interface User {
  token: string;
  id: string;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('QLimaxToken');
    if (storedUser) {
      const initialUser: User = { token: storedUser, id:"" };
      setUser(initialUser);
    }
  }, []);

  const value: UserContextType = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

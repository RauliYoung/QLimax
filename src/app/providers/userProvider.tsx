import React, { useState, useEffect, ReactNode, FC } from 'react';
import { UserContext, UserContextType } from '../contexts/usercontext';
import jwt from 'jsonwebtoken';

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
    const storedUserJson = localStorage.getItem('QLimaxUser');
    if (storedUserJson) {
      const storedUser = JSON.parse(storedUserJson);
      const decodedToken: any = jwt.decode(storedUser.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('QLimaxUser');
      } else {
        setUser(storedUser);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('QLimaxUser', JSON.stringify(user));
    }
  }, [user]); 
  const value: UserContextType = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;


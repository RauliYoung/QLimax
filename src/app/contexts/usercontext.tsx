import React from 'react';

interface User {
  token: string;
  id: string;
}

interface UserContextProps {
  user: null | User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export type UserContextType = UserContextProps;

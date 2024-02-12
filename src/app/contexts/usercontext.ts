import React from 'react';

interface UserContextProps {
  user: null | { token: string };
  setUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
}

const initialUser = localStorage.getItem('token') ? { token: localStorage.getItem('token') } : null;

export const UserContext = React.createContext<UserContextProps>({
  user: initialUser,
  setUser: () => {},
});

export type UserContextType = {
  user: null | { token: string };
  setUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
}


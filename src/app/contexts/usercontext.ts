import React from 'react';

interface UserContextProps {
  user: null | { token: string };
  setUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
}

export const UserContext = React.createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export type UserContextType = {
  user: null | { token: string };
  setUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
}



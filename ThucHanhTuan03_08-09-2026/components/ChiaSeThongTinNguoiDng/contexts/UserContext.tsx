import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

export type User = {
  name: string;
  email: string;
  avatar: ImageSourcePropType;
};

type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const defaultUser: User = {
  name: 'Tô Nguyễn An Thuyên',
  email: 'antoan@gmail.com',
  avatar: require('@/assets/images/react-logo.png'),
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);

  const value = useMemo(
    () => ({
      user,
      login: (nextUser: User) => setUser(nextUser),
      logout: () => setUser(null),
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used inside a UserProvider');
  }

  return context;
}

/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';
import { createContext, ReactNode } from 'react';

export interface User {
  register: string;
  email: string;
  role: string;
}

interface IUserProvider {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isAuthenticated: boolean;
  logout: VoidFunction;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User | undefined>();

  const isAuthenticated = !!user;

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
  };

  const value = useMemo(() => {
    return {
      user,
      setUser,
      isAuthenticated,
      logout,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

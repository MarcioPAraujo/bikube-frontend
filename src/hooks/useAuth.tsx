'use client';

/* eslint-disable react/jsx-no-constructed-context-values */

import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { redirect, usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { createContext, ReactNode } from 'react';

export interface User {
  register: string;
  email: string;
  role: string;
  nome: string;
  id: string;
  setor: string;
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
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user?.id;
  const publicRoutes = ['/'];

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
    setUser(undefined);
    redirect('/');
  };
  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated,
      logout,
    }),
    [user, isAuthenticated],
  );

  if (loading) return null;

  if (!isAuthenticated && !publicRoutes.includes(pathName)) {
    redirect('/');
  }
  if (isAuthenticated && pathName === '/') {
    redirect('/home');
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

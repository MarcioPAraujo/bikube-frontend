'use client';

/* eslint-disable react/jsx-no-constructed-context-values */

import { LOCAL_STORAGE_KEYS, SESSION_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { redirect, usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    let storedUser = sessionStorage.getItem(SESSION_STORAGE_KEYS.user);
    if (!storedUser) {
      storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
    }
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  const isAuthenticated = !!user?.id;
  const publicRoutes = ['/'];

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.user);

    sessionStorage.removeItem(SESSION_STORAGE_KEYS.user);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.token);
    setUser(undefined);
  };

  if (!isAuthenticated && !publicRoutes.includes(pathName)) {
    redirect('/');
  }
  if (isAuthenticated && pathName === '/') {
    redirect('/home');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

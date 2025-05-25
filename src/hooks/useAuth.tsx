/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';
import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
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

  const isAuthenticated = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

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

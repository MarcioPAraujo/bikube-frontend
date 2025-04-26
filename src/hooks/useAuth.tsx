/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import { useContext, useState } from 'react';
import { createContext, ReactNode } from 'react';

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface ILoginResponse {
  jwt: string;
  refreshToken: string;
  user: User;
  role: number;
}

interface IUserProvider {
  user: User | undefined;
  isAuthenticated: boolean;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

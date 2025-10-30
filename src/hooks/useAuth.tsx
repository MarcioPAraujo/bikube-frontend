'use client';

/* eslint-disable react/jsx-no-constructed-context-values */

import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { redirect, usePathname, useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

const publicRoutes = ['/', '/email', '/codigo', '/redefinir-senha'];
const employeeRoutes = [
  '/home',
  '/minhas-informacoes',
  '/comunicados',

  '/ferias/minhas-ferias',

  '/gestao-do-ponto/registro',
  '/gestao-do-ponto/historico',
  '/gestao-do-ponto/solicitacoes',
];
const rhRoutes = [
  '/setores',
  '/home',

  '/funcionarios',
  '/funcionarios/detalhes/',
  '/funcionarios/cadastrar',

  '/minhas-informacoes',

  '/comunicados',
  '/comunicados/novo',

  '/ferias/minhas-ferias',
  '/ferias/solicitacoes',
  '/ferias/ferias-do-mes',

  '/gestao-do-ponto/registro',
  '/gestao-do-ponto/historico',
  '/gestao-do-ponto/solicitacoes',
  '/gestao-do-ponto/colaboradores',

  // all recrutation routes are allowed for RH
  '/recrutamento',
];

const AuthProvider = ({ children }: ChildrenProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user?.id;
  const isRH = user?.role === 'RH';
  const isOnlyEmployee = user?.role === 'FUNCIONARIO';
  useEffect(() => {
    let storedUser = sessionStorage.getItem(SESSION_STORAGE_KEYS.employee);
    if (!storedUser) {
      storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.employee);
    }
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.employee);

    sessionStorage.removeItem(SESSION_STORAGE_KEYS.employee);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.token);
    setUser(undefined);
  };

  const value: IUserProvider = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated,
      logout,
    }),
    [user, isAuthenticated, logout, setUser],
  );

  if (loading) return null;
  const allowedMenus = (routes: string[]) => {
    const isAllowed = routes.some(route => pathName.startsWith(route));
    return isAllowed;
  };

  if (!isAuthenticated && !publicRoutes.includes(pathName)) {
    redirect('/');
  }
  if (isAuthenticated && pathName === '/') {
    redirect('/home');
  }
  if (isAuthenticated && isOnlyEmployee && !allowedMenus(employeeRoutes)) {
    router.back();
  }
  if (isAuthenticated && isRH && !allowedMenus(rhRoutes)) {
    router.back();
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

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

/**
 * Defines the routes accessible based on authentication and user roles
 * Public routes are accessible to everyone
 * Employee routes are accessible to users with the "FUNCIONARIO" role
 * RH routes are accessible to users with the "RH" role
 * There is no routes defined for admin role, because admin has access to all routes
 */
const publicRoutes = [
  '/',
  '/email',
  '/codigo',
  '/redefinir-senha',
  '/termos-de-uso',
  '/politicas-de-privacidade',
];
const employeeRoutes = [
  '/home',
  '/minhas-informacoes',
  '/comunicados',

  '/ferias/minhas-ferias',

  '/gestao-do-ponto/registro',
  '/gestao-do-ponto/historico',
  '/gestao-do-ponto/solicitacoes',

  '/gestao-do-ponto/feriados',
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
  '/gestao-do-ponto/feriados',
  '/gestao-do-ponto/csv',

  // all recrutation routes are allowed for RH
  '/recrutamento',
];

const AuthProvider = ({ children }: ChildrenProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);

  /**
   * Determines if the user is authenticated based on the presence of user ID
   * the user will only have an ID if he is logged in
   * onther wise, user will be undefined
   */
  const isAuthenticated = !!user?.id;

  const isRH = user?.role === 'RH';
  const isOnlyEmployee = user?.role === 'FUNCIONARIO';

  /**
   * Loads the user data from sessionStorage or localStorage on component mount
   * It sets the user state and loading state accordingly
   * It keeps the user logged in across page refreshes
   */
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

  // Handles user logout by clearing storage and resetting user state
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

  // while the data is being retrieve from storage, don't render anything
  if (loading) return null;

  const allowedMenus = (routes: string[]) => {
    const isAllowed = routes.some(route => pathName.startsWith(route));
    return isAllowed;
  };

  /**
   * Redirects user to login if not authenticated and trying to access protected routes
   */
  if (!isAuthenticated && !publicRoutes.includes(pathName)) {
    redirect('/');
  }

  /**
   * Redirects authenticated users to home if he is logged in and is on the login page
   */
  if (isAuthenticated && pathName === '/') {
    redirect('/home');
  }

  /**
   * Redirects users to previous page if he is an employee trying to access RH ou ADMIN routes
   */
  if (isAuthenticated && isOnlyEmployee && !allowedMenus(employeeRoutes)) {
    router.back();
  }
  /** * Redirects users to previous page if he is an RH trying to access ADMIN routes
   */
  if (isAuthenticated && isRH && !allowedMenus(rhRoutes)) {
    router.back();
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

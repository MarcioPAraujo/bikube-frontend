import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { redirect, usePathname } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface ICandidate {
  id: string;
}

interface IUserProvider {
  candidate: ICandidate | undefined;
  setCandidate: Dispatch<SetStateAction<ICandidate | undefined>>;
  isAuthenticated: boolean;
  logout: VoidFunction;
}

const CandidateAuthContext = createContext({} as IUserProvider);

interface ChildrenProps {
  children: ReactNode;
}

// no authentication is needed for these routes
const publicRoutes = {
  LOGIN: '/candidato-login',
  SEND_CODE: '/candidato-codigo',
  RESET_PASSWORD: '/candidato-redefinir-senha',
  EMAIL: '/candidato-email',
  ACCESS: '/candidato-registro/credenciais-de-acesso',
  VERIFY_EMAIL: '/candidato-registro/credenciais-de-acesso/verificar-email',
  PERSONAL_INFO: '/candidato-registro/dados-pessoais',
  PROFESSIONAL_INFO: '/candidato-registro/experiencia-profissional',
  ACADEMIC_INFO: '/candidato-registro/formacao-academica',
  SKILLS: '/candidato-registro/habilidades',
};

/**
 * Provides authentication context for candidate users
 * It manages candidate state, authentication status, and logout functionality
 */
export const CandidateAuthProvider = ({ children }: ChildrenProps) => {
  const [candidate, setCandidate] = useState<ICandidate | undefined>();
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);

  /**
   * Determines if the candidate is authenticated based on the presence of candidate ID
   * the candidate will only have an ID if he is logged in
   * onther wise, candidate will be undefined
   */
  const isAuthenticated = !!candidate?.id;

  /**
   * Loads the candidate data from sessionStorage or localStorage on component mount
   * It sets the candidate state and loading state accordingly
   * It keeps the candidate logged in across page refreshes
   */
  useEffect(() => {
    let storedCandidate = sessionStorage.getItem(
      SESSION_STORAGE_KEYS.candidate,
    );
    if (!storedCandidate) {
      storedCandidate = localStorage.getItem(LOCAL_STORAGE_KEYS.candidate);
    }

    if (storedCandidate) {
      const parsedCandidate = JSON.parse(storedCandidate);
      setCandidate(parsedCandidate);
    }

    setLoading(false);
  }, []);

  /**
   * Handles candidate logout by clearing storage and resetting candidate state
   * by seting user to undefined he will be considered unauthenticated
   * and will be redirected to login page
   */
  const logout = () => {
    setCandidate(undefined);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.token);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.candidate);

    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
  };
  const contextValue: IUserProvider = useMemo(
    () => ({
      candidate,
      setCandidate,
      isAuthenticated,
      logout,
    }),
    [candidate, isAuthenticated, logout, setCandidate],
  );
  if (loading) return null;

  /**
   * Redirects candidate to login if not authenticated and trying to access protected routes
   */
  if (
    !isAuthenticated &&
    !Object.values(publicRoutes).some(route => route === pathName)
  ) {
    redirect(publicRoutes.LOGIN);
  }

  /**
   * Redirects authenticated candidates to home if he is logged in and is on the login page
   */
  if (isAuthenticated && Object.values(publicRoutes).includes(pathName)) {
    redirect('/area-do-candidato/inicio');
  }

  return (
    <CandidateAuthContext.Provider value={contextValue}>
      {children}
    </CandidateAuthContext.Provider>
  );
};

export const useCandidateAuth = () => {
  const context = useContext(CandidateAuthContext);
  if (!context) {
    throw new Error(
      'useCandidateAuth must be used within an CandidateAuthProvider',
    );
  }
  return context;
};

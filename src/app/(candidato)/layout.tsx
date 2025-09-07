'use client';

import { CandidateAuthProvider } from '@/hooks/usecandidateAuth';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <CandidateAuthProvider>{children}</CandidateAuthProvider>;
};

export default Layout;

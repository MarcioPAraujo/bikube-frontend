'use client';

import { CandidateAuthProvider } from '@/hooks/usecandidateAuth';

const CandidateLayout = ({ children }: { children: React.ReactNode }) => {
  return <CandidateAuthProvider>{children}</CandidateAuthProvider>;
};

export default CandidateLayout;

'use client';

import { useRouter } from 'next/navigation';
import { PageContainer } from '../styles';
import IconButton from '@/components/Buttons/IconButton';
import { Icons } from '@/components/Icons/Icons';
import CandidateLoginForm from '@/components/Forms/login/Candidate/Login/CandidateLoginForm';

const CandidateLoginPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton icon={Icons.ArrowLeft} onClick={() => router.push('/')} />
      <CandidateLoginForm />
    </PageContainer>
  );
};
export default CandidateLoginPage;

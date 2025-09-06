'use client';

import { useRouter } from 'next/navigation';
import IconButton from '@/components/Buttons/IconButton';
import { Icons } from '@/components/Icons/Icons';
import CandidateLoginForm from '@/components/Forms/login/Candidate/Login/CandidateLoginForm';
import { PageContainer } from '../styles';

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

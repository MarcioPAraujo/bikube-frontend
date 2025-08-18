'use client';

import CandidateEmailVerificationForm from '@/components/Forms/login/Candidate/EmailVerification/CandidateEmailVerifcationForm';
import { PageContainer } from '../styles';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Buttons/IconButton';
import { Icons } from '@/components/Icons/Icons';

const CandidateEmailVerificationPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton icon={Icons.ArrowLeft} onClick={() => router.push('/candidato-login')} />
      <CandidateEmailVerificationForm />
    </PageContainer>
  );
};
export default CandidateEmailVerificationPage;

'use client';

import CandidateEmailVerificationForm from '@/components/Forms/login/Candidate/EmailVerification/CandidateEmailVerifcationForm';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import { PageContainer } from '../styles';

const CandidateEmailVerificationPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton
        iconNode={<Icon name="ArrowLeft" />}
        onClick={() => router.push('/candidato-login')}
      />
      <CandidateEmailVerificationForm />
    </PageContainer>
  );
};
export default CandidateEmailVerificationPage;

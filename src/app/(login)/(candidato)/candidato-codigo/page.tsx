'use client';

import { useRouter } from 'next/navigation';
import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import CandidateCodeVerificationForm from '@/components/Forms/login/Candidate/CodeVerification/CandidateCodeVerificationForm';
import { PageContainer } from '../styles';

const CandidateCodeVerificationPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton
        iconNode={<Icon name="ArrowLeft" />}
        onClick={() => router.push('/candidato-email')}
      />
      <CandidateCodeVerificationForm />
    </PageContainer>
  );
};
export default CandidateCodeVerificationPage;

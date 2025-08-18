'use client';

import { useRouter } from 'next/navigation';
import { PageContainer } from '../styles';
import IconButton from '@/components/Buttons/IconButton';
import { Icons } from '@/components/Icons/Icons';

const CandidateCodeVerificationPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton icon={Icons.ArrowLeft} onClick={() => router.push('/candidato-email')} />
    </PageContainer>
  );
};
export default CandidateCodeVerificationPage;

'use client';

import IconButton from '@/components/Buttons/IconButton';
import { PageContainer } from '../styles';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons/Icons';

const CodeConfirmationPage = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton icon={Icons.ArrowLeft} onClick={() => router.back()} />
    </PageContainer>
  );
};
export default CodeConfirmationPage;

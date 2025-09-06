'use client';

import IconButton from '@/components/Buttons/IconButton';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons/Icons';
import CodeVerficationForm from '@/components/Forms/login/Employee/CodeVerification/CodeVerificationForm';
import { PageContainer } from '../styles';

const CodeConfirmationPage = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton icon={Icons.ArrowLeft} onClick={() => router.back()} />
      <CodeVerficationForm />
    </PageContainer>
  );
};
export default CodeConfirmationPage;

'use client';

import EmailVerificationForm from '@/components/Forms/login/Employee/EmailVerification/EmailVerificationForm';
import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';
import { PageContainer } from '../styles';

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton
        iconNode={<Icon name="ArrowLeft" />}
        onClick={() => router.push('/')}
      />
      <EmailVerificationForm />
    </PageContainer>
  );
};
export default ForgotPasswordPage;

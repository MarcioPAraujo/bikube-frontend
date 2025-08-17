'use client';

import EmployeeLoginForm from '@/components/Forms/login/Employee/Login/EmployeeLoginForm';
import { useRouter } from 'next/navigation';
import { CustomLink, PageContainer } from './styles';
import AlertModal from '@/components/modals/AlertModal/AlertModal';

const Login = () => {
  return (
    <>
      <PageContainer>
        <EmployeeLoginForm />
        <CustomLink href="/candidato-login">Logar como candidato</CustomLink>
      </PageContainer>
    </>
  );
};

export default Login;

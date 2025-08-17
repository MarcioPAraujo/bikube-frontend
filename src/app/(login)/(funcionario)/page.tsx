'use client';

import EmployeeLoginForm from '@/components/Forms/login/Employee/Login/EmployeeLoginForm';
import { CustomLink, PageContainer } from './styles';

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

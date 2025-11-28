'use client';

import EmployeeLoginForm from '@/components/Forms/login/Employee/Login/EmployeeLoginForm';
import { CustomLink, FormLinksContainer, PageContainer } from './styles';

const Login = () => {
  return (
    <PageContainer>
      <EmployeeLoginForm />
      <FormLinksContainer>
        <CustomLink href="/candidato-login">Logar como candidato</CustomLink>
        <CustomLink href="/termos-de-uso">Termos de uso</CustomLink>
        <CustomLink href="/politicas-de-privacidade">
          Políticas de privacidade
        </CustomLink>
      </FormLinksContainer>
    </PageContainer>
  );
};

export default Login;

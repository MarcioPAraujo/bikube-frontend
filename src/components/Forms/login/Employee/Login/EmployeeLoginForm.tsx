import InputComponent from '@/components/Inputs/InputComponent';
import { CustomLink, Form, SubmitButton, Title } from './employeeLoginFormStyles';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';

const EmployeeLoginForm: React.FC = () => {
  return (
    <Form>
      <Title>Login</Title>
      <InputComponent id="register" labelText="Registro do colaborador" placeholder="EX: AAAAAA00" />
      <PasswordInput id="password" labelText="Senha" placeholder="Insira sua senha" />
      <CustomLink href="/email">Esqueci a senha</CustomLink>
      <SubmitButton type="submit">Entrar</SubmitButton>
    </Form>
  );
};
export default EmployeeLoginForm;

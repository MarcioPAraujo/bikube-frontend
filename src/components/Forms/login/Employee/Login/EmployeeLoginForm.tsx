import InputComponent from '@/components/Inputs/InputComponent';
import { CustomLink, Form, SubmitButton, Title } from '../commonStyles';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';
import useEmployeeLoginForm from './useEmployeeLoginForm';

const EmployeeLoginForm: React.FC = () => {
  const {
    hookform: { errors, handleSubmit, isSubmitting, isValid, register },
    onFormSubmit,
    onRegisterFieldChange,
  } = useEmployeeLoginForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Login</Title>
      <InputComponent
        id="register"
        labelText="Registro do colaborador"
        placeholder="EX: AAAAAA00"
        register={register('register', {
          onChange: e => onRegisterFieldChange(e.target.value),
        })}
        errorMessage={errors.register?.message}
      />
      <PasswordInput
        id="password"
        labelText="Senha"
        placeholder="Insira sua senha"
        register={register('password')}
        errorMessage={errors.password?.message}
      />
      <CustomLink href="/email">Esqueci a senha</CustomLink>
      <SubmitButton type="submit" disabled={isSubmitting || !isValid}>
        Entrar
      </SubmitButton>
    </Form>
  );
};
export default EmployeeLoginForm;

import InputComponent from '@/components/Inputs/InputComponent';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';
import { CustomLink, Form, SubmitButton, Title } from '../styles';
import useCandidateLoginForm from './useCandidateLoginForm';

const CandidateLoginForm: React.FC = () => {
  const {
    hookform: { errors, isValid, isSubmitting, handleSubmit, register },
    onEmailChange,
    onFormSubmit,
  } = useCandidateLoginForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Login</Title>
      <InputComponent
        id="email"
        labelText="Email"
        placeholder="Insira seu email"
        register={register('email', {
          onChange: e => onEmailChange(e.target.value),
        })}
        errorMessage={errors.email?.message}
      />
      <PasswordInput
        id="password"
        labelText="Senha"
        placeholder="Insira sua senha"
        register={register('password')}
        errorMessage={errors.password?.message}
      />
      <CustomLink href="/candidato-email">Esqueci a senha</CustomLink>
      <CustomLink href="/candidato-registro/credenciais-de-acesso">
        Primeiro acesso
      </CustomLink>
      <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
        Entrar
      </SubmitButton>
    </Form>
  );
};
export default CandidateLoginForm;
